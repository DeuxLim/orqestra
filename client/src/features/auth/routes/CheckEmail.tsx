import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { resendEmailVerification } from "../auth.api";

export default function CheckEmail() {
    const { mutate, isPending, isSuccess } = useMutation({
        mutationKey: ["resend-email"],
        mutationFn: resendEmailVerification,
    });

    const handleResendEmail = () => {
        mutate();
    };
    return (
        <AuthLayout>
            <Card className="w-110 text-center">
                <CardHeader>
                    <CardTitle>Please check your email</CardTitle>
                </CardHeader>

                <CardContent className="space-y-8">
                    <p className="text-sm text-muted-foreground">
                        We sent you a verification link. Please check your
                        inbox.
                    </p>

                    <Button
                        onClick={handleResendEmail}
                        disabled={isPending || isSuccess}
                        variant="outline"
                        className={`w-full
                            ${isPending ? "bg-yellow-300 !hover:bg-yellow-300" : ""}
                            ${isSuccess ? "bg-green-300 !hover:bg-green-300" : ""}
                        `}
                    >
                        {isPending
                            ? "Sending email verification link..."
                            : isSuccess
                              ? "Email verification link sent!"
                              : "Resend Email"}
                    </Button>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
