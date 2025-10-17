import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "~/features/shared/components/ui/button";
import { Input } from "~/features/shared/components/ui/input";
import { Label } from "~/features/shared/components/ui/label";

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  surname: z.string().min(2, "Surname must be at least 2 characters").max(100, "Surname must be less than 100 characters"),
  username: z.string().min(2, "Username must be at least 2 characters").max(30, "Username must be less than 30 characters"),
  email: z.email("Invalid email address").max(100, "Email must be less than 100 characters"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password must be less than 100 characters").uppercase("Password must contain at least one uppercase letter").lowercase("Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters").max(100, "Confirm Password must be less than 100 characters").uppercase("Confirm Password must contain at least one uppercase letter").lowercase("Confirm Password must contain at least one lowercase letter").regex(/[0-9]/, "Confirm Password must contain at least one number").regex(/[^a-zA-Z0-9]/, "Confirm Password must contain at least one special character"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    // Handle sign-up logic here
    console.log("Sign Up Data:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Navigate to dashboard or home page after successful sign-up
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
        <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-zinc-100">Create new account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
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
            <Input
              id="password"
              type="password"
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
            <Input
              id="confirmPassword"
              type="password"
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