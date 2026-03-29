import api from "@/lib/api";
import type { LoginInputType } from "@/features/auth/auth.types";
import { getCsrfToken } from "@/lib/csrf";

export const login = async (data: LoginInputType) => {
    await getCsrfToken();
    const response = await api.post("/login", data);
    return response;
};
