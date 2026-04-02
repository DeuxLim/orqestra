import AuthLayout from "@/components/layouts/AuthLayout";
import { LoginForm } from "@/features/auth/components/login-form";

export default function Login() {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
}
