import { Outlet } from "react-router";
import AuthLayout from "@/components/layouts/AuthLayout";

export default function AuthRouteLayout() {
    return (
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    );
}
