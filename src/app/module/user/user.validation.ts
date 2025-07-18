import z, { object } from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be less than 50 characters" }),

  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "🔒 Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "🔠 Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "🔢 Password must contain at least one number",
    })
    .regex(/[!@#$%^&*()\-_=+{};:,<.>]/, {
      message: "❗ Password must contain at least one special character",
    })
    .optional(),

  phone: z
    .string()
    .regex(/^\+8801[0-9]{9}$/, {
      message:
        "📞 Phone number must be a valid Bangladeshi number (+8801XXXXXXXXX)",
    })
    .optional(),

  address: z
    .string()
    .min(5, { message: "📍 Address must be at least 5 characters long" })
    .optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be less than 50 characters" })
    .optional(),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "🔒 Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "🔠 Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "🔢 Password must contain at least one number",
    })
    .regex(/[!@#$%^&*()\-_=+{};:,<.>]/, {
      message: "❗ Password must contain at least one special character",
    })
    .optional(),

  phone: z
    .string()
    .regex(/^\+8801[0-9]{9}$/, {
      message:
        "📞 Phone number must be a valid Bangladeshi number (+8801XXXXXXXXX)",
    })
    .optional(),

  address: z
    .string()
    .min(5, { message: "📍 Address must be at least 5 characters long" })
    .optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
  isActive: z.enum(Object.values(IsActive) as [string]).optional(),
  isDeleted: z.boolean({ error: "IsDeleted bust be true of false" }).optional(),
  isVerified: z
    .boolean({ error: "IsDeleted bust be true of false" })
    .optional(),
});
