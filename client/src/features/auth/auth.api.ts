import api from "@/lib/api";
import type {
    LoginInputType,
    RegisterInputType,
} from "@/features/auth/auth.types";
import { getCsrfToken } from "@/lib/csrf";

export const login = async (data: LoginInputType) => {
    await getCsrfToken();
    const response = await api.post("/login", data);
    return response;
};

export const register = async (data: RegisterInputType) => {
    await getCsrfToken();
    const response = await api.post("/register", data);
    return response;
};

export const resendEmailVerification = async () => {
    const response = await api.post("/email/verification-notification");
    return response;
};

export const fetchCurrentUser = async () => {
    const response = await api.get("/user");
    return response.data;
};

export const logout = async () => {
    const response = await api.post("/logout");
    return response;
};
