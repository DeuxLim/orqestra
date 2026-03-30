import AuthLayout from "@/components/layouts/AuthLayout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function EmailVerified() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/orqestra/dashboard");
        }, 5000);
    });
    return (
        <AuthLayout>
            <Card className="w-110 text-center">
                <CardHeader>
                    <CardTitle>You account is now verified</CardTitle>
                </CardHeader>
            </Card>
        </AuthLayout>
    );
}
