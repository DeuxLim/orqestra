import AuthLayout from "@/components/layouts/AuthLayout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function EmailVerified() {
    const navigate = useNavigate();
    const [loadingProgress, setLoadingProgress] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    navigate("/dashboard");
                    return 0;
                }
                return prev - 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <AuthLayout>
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>
                        You account is now verified. <br /> Redirecting you to
                        your workspace.
                    </CardTitle>
                </CardHeader>
                <div className="px-10">
                    <Progress value={loadingProgress} />
                </div>
            </Card>
        </AuthLayout>
    );
}
