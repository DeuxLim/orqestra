import AuthLayout from "@/components/layouts/AuthLayout";
import { LoginForm } from "@/components/login-form";

export default function Login() {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
}
