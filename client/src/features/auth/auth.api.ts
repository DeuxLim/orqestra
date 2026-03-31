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
    const response = await api.post(
        "/email/verification-notification",
        {},
        { withCredentials: true },
    );
    return response;
};
