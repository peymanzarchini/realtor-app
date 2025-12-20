import z from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .max(40, "First name must not exceed 40 characters"),
  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters")
    .max(40, "Last name must not exceed 40 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNumber: z
    .string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Invalid phone number"),
  role: z.enum(["client", "agent", "admin"]).optional(),
});

export const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterBody = z.infer<typeof registerSchema>;
export type LoginBody = z.infer<typeof loginSchema>;
