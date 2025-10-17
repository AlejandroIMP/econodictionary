import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "~/features/shared/components/ui/button";
import { Input } from "~/features/shared/components/ui/input";
import { PasswordInput } from "~/features/shared/components/ui/password-input";
import { Label } from "~/features/shared/components/ui/label";
import { useAuth } from "~/features/auth/hooks";

const signInSchema = z.object({
  emailOrUsername: z.string().min(2, "Email or Username must be at least 2 characters").max(100, "Email or Username must be less than 100 characters"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password must be less than 100 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try{
      await login(data.emailOrUsername, data.password);
      navigate("/");
    } catch (e) {
      // Handle login error (e.g., show a notification)
      console.error("Login failed", e);
      }

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
            <Label htmlFor="emailOrUsername" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email or Username
            </Label>
            <Input
              id="emailOrUsername"
              type="text"
              placeholder="Enter your email or username"
              {...register("emailOrUsername")}
              className="mt-1"
            />
            {errors.emailOrUsername && (
              <p className="mt-1 text-sm text-red-600">{errors.emailOrUsername.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </Label>
            <PasswordInput
              id="password"
              placeholder="Enter your password"
              {...register("password")}
              className="mt-1"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/auth/sign-up")}
          >
            Sign Up
          </Button>
          <div className="text-sm text-center text-zinc-600 dark:text-zinc-400">
            Don't have an account?
          </div>
        </div>
        <div className="text-sm text-center text-zinc-600 dark:text-zinc-400">
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/auth/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>
      </div>
  );
}