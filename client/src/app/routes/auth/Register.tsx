import AuthLayout from "@/components/layouts/AuthLayout";
import { SignupForm } from "@/features/auth/components/signup-form";

export default function Register() {
    return (
        <AuthLayout>
            <SignupForm />
        </AuthLayout>
    );
}
