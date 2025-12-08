import z from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(3, "نام باید حداقل ۳ کاراکتر باشد")
    .max(40, "نام نباید بیشتر از ۴۰ کاراکتر باشد"),
  lastName: z
    .string()
    .min(3, "نام خانوادگی باید حداقل ۳ کاراکتر باشد")
    .max(40, "نام خانوادگی نباید بیشتر از ۴۰ کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
  phoneNumber: z
    .string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, "شماره تلفن معتبر نیست"),
  role: z.enum(["client", "agent", "admin"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(1, "رمز عبور الزامی است"),
});

export type RegisterBody = z.infer<typeof registerSchema>;
export type LoginBody = z.infer<typeof loginSchema>;
