import { useNavigate, useParams, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2, AlertCircle, CheckCircle2, Circle } from "lucide-react";
import { Button } from "~/features/shared/components/ui/button";
import { PasswordInput } from "~/features/shared/components/ui/password-input";
import { Label } from "~/features/shared/components/ui/label";
import { passwordSchema } from "~/features/auth/utils/validationSchemas";
import { useAuth } from "~/features/auth/hooks";
import { useEffect, useState } from "react";

const isDev = import.meta.env.DEV;

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: passwordSchema,
  confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

/**
 * Validar requisitos de contraseña en tiempo real
 */
function validatePasswordRequirements(password: string) {
  return {
    minLength: password.length >= 6,
    maxLength: password.length <= 100,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[^a-zA-Z0-9]/.test(password),
  };
}

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
      ) : (
        <Circle className="w-4 h-4 text-gray-300 dark:text-gray-600" />
      )}
      <span className={`text-xs ${met ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}`}>
        {text}
      </span>
    </div>
  );
}

export default function ResetPassword() {
  const { resetPassword, error, clearError, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [passwordValue, setPasswordValue] = useState("");

  useEffect(() => {
    if (isDev)console.log("🔐 ResetPassword page loaded");
    if (isDev)console.log("📌 Token from URL:", token);
    return () => {
      clearError();
    };
  }, [clearError, token]);


  if (!token) {
    return (
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-800 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100">Invalid or Missing Token</h2>
        <p className="text-center text-zinc-700 dark:text-zinc-300">The password reset token is missing or invalid. Please request a new password reset.</p>
        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/auth/forgot-password")}
          >
            Go to Forgot Password
          </Button>
        </div>
      </div>
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      token: token,
      password: "",
      confirmPassword: "",
    },
  });

  // Set token value when it changes
  useEffect(() => {
    if (token) {
      setValue("token", token);
      if (isDev)console.log("🎯 Token set in form:", token);
    }
  }, [token, setValue]);

  const isLoading = authLoading || isSubmitting;

  // Interceptar submit para debug
  const onFormSubmit = handleSubmit(
    async (data) => {
      if (isDev)console.log("✅ FORM SUBMITTED! onSubmit called!");
      if (isDev)console.log("🔄 Resetting password with token:", token);
      if (isDev)console.log("📝 Form data:", { password: data.password, confirmPassword: data.confirmPassword, token: data.token });
      if (isDev)console.log("✅ Form validation passed - about to call resetPassword");
      
      try {
        clearError();
        const result = await resetPassword(token, data.password);
        if (isDev)console.log("✅ resetPassword returned:", result);
        
        if (isDev)console.log("✅ Password reset successful");
        navigate("/auth/sign-in");
      } catch (e) {
        console.error("❌ Error resetting password:", e);
        // Error is already set in the store
      }
    },
    (errors) => {
      console.error("❌ FORM VALIDATION FAILED!");
      console.error("📝 Validation errors:", errors);
      console.error("🔍 Form state:", {
        errors,
        isSubmitting,
        token,
      });
    }
  );

  return (
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-800 rounded-lg">
        <div className="text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        </div>
        <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100">Reset Password</h2>
        
        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <p className="text-sm text-red-700 dark:text-red-300">{error.message}</p>
          </div>
        )}
        
        <form onSubmit={onFormSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              New Password
            </Label>
            <PasswordInput
              id="password"
              placeholder="Enter your new password"
              {...register("password", {
                onChange: (e) => {
                  setPasswordValue(e.target.value);
                  console.log("🔑 Password input changed:", {
                    length: e.target.value.length,
                    requirements: validatePasswordRequirements(e.target.value),
                  });
                },
              })}
              className="mt-1"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600 font-medium">❌ {errors.password.message}</p>
            )}
            
            {/* Password Requirements */}
            {passwordValue && (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg space-y-2">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-200">Password Requirements:</p>
                <PasswordRequirement 
                  met={validatePasswordRequirements(passwordValue).minLength}
                  text="At least 6 characters"
                />
                <PasswordRequirement 
                  met={validatePasswordRequirements(passwordValue).hasUppercase}
                  text="At least one uppercase letter (A-Z)"
                />
                <PasswordRequirement 
                  met={validatePasswordRequirements(passwordValue).hasLowercase}
                  text="At least one lowercase letter (a-z)"
                />
                <PasswordRequirement 
                  met={validatePasswordRequirements(passwordValue).hasNumber}
                  text="At least one number (0-9)"
                />
                <PasswordRequirement 
                  met={validatePasswordRequirements(passwordValue).hasSpecialChar}
                  text="At least one special character (!@#$%^&*)"
                />
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Confirm New Password
            </Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Confirm your new password"
              {...register("confirmPassword")}
              className="mt-1"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600 font-medium">❌ {errors.confirmPassword.message}</p>
            )}
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>

      </div>
  );
}