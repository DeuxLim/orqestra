import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { isEmpty } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/features/auth/auth.api";
import type { LoginInputType } from "@/features/auth/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInputSchema } from "../auth.schema";
import type { LaravelValidationError } from "@/shared/types/api";
import type { AxiosError } from "axios";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { register, handleSubmit, setError } = useForm<LoginInputType>({
        resolver: zodResolver(LoginInputSchema),
    });

    const { isPending, mutate, isError, error } = useMutation({
        mutationKey: ["login"],
        mutationFn: login,
        onError: (error: AxiosError<LaravelValidationError>) => {
            if (!error.response) return;
            if (error.response.status !== 422) return;

            const serverErrors = error.response.data?.errors;
            if (!serverErrors) return;

            Object.entries(serverErrors).forEach(([field, messages]) => {
                setError(field as keyof LoginInputType, {
                    type: "server",
                    message: messages[0],
                });
            });
        },
    });

    const submit = (data: LoginInputType) => {
        mutate(data);
    };

    const globalError = isError
        ? error?.response?.data?.message ||
          "Something went wrong. Please try again."
        : "";

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(submit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    required
                                    {...register("email")}
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    {...register("password")}
                                />
                            </Field>

                            {!isEmpty(globalError) && (
                                <FieldError
                                    className="mx-auto"
                                    errors={[
                                        {
                                            message: globalError,
                                        },
                                    ]}
                                />
                            )}

                            <Field>
                                <Button type="submit">
                                    {isPending ? "Logging in..." : "Login"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account?{" "}
                                    <Link to="/register">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    );
}
