import { redirect, type LoaderFunctionArgs } from "react-router";
import { fetchCurrentUser } from "@/features/auth/auth.api";

const buildRedirectToParam = (requestUrl: string) => {
    const url = new URL(requestUrl);
    const value = `${url.pathname}${url.search}`;
    return encodeURIComponent(value);
};

export const requireAuthLoader = async ({ request }: LoaderFunctionArgs) => {
    try {
        const user = await fetchCurrentUser();
        if (!user?.email_verified_at) {
            return redirect("/check-email");
        }
        return null;
    } catch {
        return redirect(
            `/login?redirectTo=${buildRedirectToParam(request.url)}`,
        );
    }
};

export const redirectIfAuthenticatedLoader = async () => {
    try {
        const user = await fetchCurrentUser();
        if (user?.email_verified_at) {
            return redirect("/dashboard");
        }
        return redirect("/check-email");
    } catch {
        return null;
    }
};
