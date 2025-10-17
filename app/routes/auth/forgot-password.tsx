import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "~/features/shared/components/ui/button";
import { Input } from "~/features/shared/components/ui/input";
import { Label } from "~/features/shared/components/ui/label";
import { useAuth } from "~/features/auth/hooks";
import { useEffect } from "react";

const requestResetPasswordSchema = z.object({
  email: z.string().email("Invalid email address").max(100, "Email must be less than 100 characters"),
});

type RequestForgotPasswordFormData = z.infer<typeof requestResetPasswordSchema>;

export default function RequestForgotPassword() {
  const { requestPasswordReset, error, clearError } = useAuth();
  const navigate = useNavigate();

    useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RequestForgotPasswordFormData>({
    resolver: zodResolver(requestResetPasswordSchema),
  });

  const onSubmit = async (data: RequestForgotPasswordFormData) => {
    clearError();
    await requestPasswordReset(data.email);
    if(!error) navigate("/");
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
        <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100">Sign In to Your Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </Label>
            <Input
              id="email"
              type="text"
              placeholder="Enter your email"
              {...register("email")}
              className="mt-1"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Requesting Password Reset...
              </>
            ) : (
              "Request Password Reset"
            )}
          </Button>
        </form>
        <div className="text-sm text-center text-zinc-600 dark:text-zinc-400">
          Remembered your password?{" "}
          <Button
            variant="link"
            className="p-0"
            onClick={() => navigate("/auth/sign-in")}
          >
            Sign In
          </Button>
          <span className="text-zinc-400"> | </span>
          <Button
            variant="link"
            className="p-0"
            onClick={() => navigate("/auth/sign-up")}
          >
            Sign Up
          </Button>
        </div>
      </div>
  );
}