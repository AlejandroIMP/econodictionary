import { useNavigate, useParams, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "~/features/shared/components/ui/button";
import { Input } from "~/features/shared/components/ui/input";
import { Label } from "~/features/shared/components/ui/label";

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password must be less than 100 characters").uppercase("Password must contain at least one uppercase letter").lowercase("Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters").max(100, "Confirm Password must be less than 100 characters").uppercase("Confirm Password must contain at least one uppercase letter").lowercase("Confirm Password must contain at least one lowercase letter").regex(/[0-9]/, "Confirm Password must contain at least one number").regex(/[^a-zA-Z0-9]/, "Confirm Password must contain at least one special character"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token") || "";


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
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {

    data.token = token;
    // Handle sign-in logic here
    console.log("Reset Password Data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Navigate to dashboard or home page after successful sign-in
    navigate("/");
  }

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              New Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your new password"
              {...register("password")}
              className="mt-1"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              {...register("confirmPassword")}
              className="mt-1"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
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