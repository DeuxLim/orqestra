import { z } from "zod";

export const LoginInputSchema = z.object({
    email: z.email("Email is required."),
    password: z.string().trim().min(1, "Password is required,"),
});

export const RegisterInputSchema = z
    .object({
        first_name: z.string().trim().min(1, "First name is required"),
        last_name: z.string().trim().min(1, "Last name is required"),
        username: z
            .string()
            .trim()
            .min(3, "Username must be at least 3 characters"),
        email: z.email(),
        password: z
            .string()
            .min(8, "Minimum 8 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[a-z]/, "Must contain at least one lowercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(
                /[^A-Za-z0-9]/,
                "Must contain at least one special character",
            ),
        password_confirmation: z.string(),
        workspace_name: z
            .string()
            .min(1, "Workspace name is required")
            .max(100)
            .trim(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password_confirmation"],
    });
