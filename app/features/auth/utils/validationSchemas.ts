import { z } from "zod";

/**
 * Password validation schema with the following requirements:
 * - Minimum 6 characters
 * - Maximum 100 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must be less than 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
  .regex(/^\S*$/, "Password cannot contain spaces")
  .regex(/^[^.]*$/, "Password must not contain dot")
  ;

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .email("Invalid email address")
  .max(100, "Email must be less than 100 characters");

/**
 * Username validation schema
 */
export const usernameSchema = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(30, "Username must be less than 30 characters")
  .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens");

/**
 * Name validation schema (for first name, last name, etc.)
 */
export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be less than 100 characters");

/**
 * Helper to create a password confirmation schema with refine
 */
export function createPasswordConfirmationSchema<T extends { password: string; confirmPassword: string }>(
  schema: z.ZodType<T>
) {
  return schema.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
}
