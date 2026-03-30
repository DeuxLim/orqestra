import type z from "zod";
import type { LoginInputSchema, RegisterInputSchema } from "./auth.schema";

export type LoginInputType = z.input<typeof LoginInputSchema>;
export type RegisterInputType = z.input<typeof RegisterInputSchema>;
