import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "~/features/auth/hooks";

import { Button } from "~/features/shared/components/ui/button";
import { Input } from "~/features/shared/components/ui/input";
import { PasswordInput } from "~/features/shared/components/ui/password-input";
import { Label } from "~/features/shared/components/ui/label";
import { 
  passwordSchema, 
  emailSchema, 
  usernameSchema, 
  nameSchema
} from "~/features/auth/utils/validationSchemas";
import { useEffect } from "react";

const signUpSchema = z.object({
  name: nameSchema,
  surname: nameSchema,
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const { register: authRegister, error, clearError } = useAuth();
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
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    clearError();
    await authRegister(data.name, data.surname, data.username, data.email, data.password, data.confirmPassword);
    if(!error) navigate("/");
  }

  return (
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-black rounded-lg">
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
        <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100">Create new account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-black dark:text-zinc-300">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John"
              {...register("name")}
              className="mt-1"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="surname" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Surname
            </Label>
            <Input
              id="surname"
              type="text"
              placeholder="Doe"
              {...register("surname")}
              className="mt-1"
              disabled={isSubmitting}
            />
            {errors.surname && (
              <p className="mt-1 text-xs text-red-600">{errors.surname.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="username" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="johndoe"
              {...register("username")}
              className="mt-1"
              disabled={isSubmitting}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              {...register("email")}
              className="mt-1"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
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
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Confirm Password
            </Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className="mt-1"
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
        <div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/auth/sign-in")}
          >
            Sign In
          </Button>
          <div className="text-sm text-center text-zinc-600 dark:text-zinc-400">
            You have an account?{" "}
          </div>
        </div>
      </div>
  );
}