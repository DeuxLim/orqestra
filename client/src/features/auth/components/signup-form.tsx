import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInputSchema } from "../auth.schema";
import type { RegisterInputType } from "../auth.types";
import { useMutation } from "@tanstack/react-query";
import { register as registerUser } from "@/features/auth/auth.api";
import { isEmpty } from "@/utils/helpers";
import type { AxiosError } from "axios";
import type { LaravelValidationError } from "@/shared/types/api";

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RegisterInputType>({
        resolver: zodResolver(RegisterInputSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["register"],
        mutationFn: registerUser,
        onError: (error: AxiosError<LaravelValidationError>) => {
            const errors = error.response?.data?.errors;
            const status = error.response?.status;

            if (status === 422) {
                if (!errors) return;

                Object.entries(errors).forEach(([field, messages]) => {
                    setError(field as keyof RegisterInputType, {
                        type: "server",
                        message: (messages as string[])[0],
                    });
                });
            }

            if (status === 500) {
                setError("form", {
                    type: "server",
                    message: "Something went wrong. Please contact support.",
                });
            }
        },
        onSuccess: () => {
            navigate("/check-email");
        },
    });

    const submit = (data: RegisterInputType) => {
        mutate(data);
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        Create your account
                    </CardTitle>
                    <CardDescription>
                        Enter your details below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(submit)}>
                        <FieldGroup className="gap-4">
                            <Field className="grid grid-cols-2 gap-4">
                                {/* First Name */}
                                <Field>
                                    <FieldLabel htmlFor="first_name">
                                        First Name
                                    </FieldLabel>
                                    <Input
                                        id="first_name"
                                        type="text"
                                        placeholder="John"
                                        {...register("first_name")}
                                    />
                                    {!isEmpty(errors.first_name) && (
                                        <FieldError
                                            className="mx-auto text-xs"
                                            errors={[
                                                {
                                                    message:
                                                        errors.first_name
                                                            ?.message,
                                                },
                                            ]}
                                        />
                                    )}
                                </Field>

                                {/* Last Name */}
                                <Field>
                                    <FieldLabel htmlFor="last_name">
                                        Last Name
                                    </FieldLabel>
                                    <Input
                                        id="last_name"
                                        type="text"
                                        placeholder="Doe"
                                        {...register("last_name")}
                                    />
                                    {!isEmpty(errors.last_name) && (
                                        <FieldError
                                            className="mx-auto text-xs"
                                            errors={[
                                                {
                                                    message:
                                                        errors.last_name
                                                            ?.message,
                                                },
                                            ]}
                                        />
                                    )}
                                </Field>
                            </Field>

                            {/* Username */}
                            <Field>
                                <FieldLabel htmlFor="username">
                                    Username
                                </FieldLabel>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="johndoe"
                                    {...register("username")}
                                />
                                {!isEmpty(errors.username) && (
                                    <FieldError
                                        className="mx-auto text-xs"
                                        errors={[
                                            {
                                                message:
                                                    errors.username?.message,
                                            },
                                        ]}
                                    />
                                )}
                            </Field>

                            {/* Email */}
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="johndoe@example.com"
                                    {...register("email")}
                                />
                                {!isEmpty(errors.email) && (
                                    <FieldError
                                        className="mx-auto text-xs"
                                        errors={[
                                            {
                                                message: errors.email?.message,
                                            },
                                        ]}
                                    />
                                )}
                            </Field>

                            {/* Password and Password Confirmation */}
                            <Field>
                                <Field className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="password">
                                            Password
                                        </FieldLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            {...register("password")}
                                        />
                                        {!isEmpty(errors.password) && (
                                            <FieldError
                                                className="mx-auto text-xs"
                                                errors={[
                                                    {
                                                        message:
                                                            errors.password
                                                                ?.message,
                                                    },
                                                ]}
                                            />
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="password_confirmation">
                                            Confirm Password
                                        </FieldLabel>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            {...register(
                                                "password_confirmation",
                                            )}
                                        />
                                        {!isEmpty(
                                            errors.password_confirmation,
                                        ) && (
                                            <FieldError
                                                className="mx-auto text-xs"
                                                errors={[
                                                    {
                                                        message:
                                                            errors
                                                                .password_confirmation
                                                                ?.message,
                                                    },
                                                ]}
                                            />
                                        )}
                                    </Field>
                                </Field>

                                {/* Email */}
                                <Field>
                                    <FieldLabel htmlFor="email">
                                        Workspace name
                                    </FieldLabel>
                                    <Input
                                        id="workspace_name"
                                        type="text"
                                        placeholder="Acme Inc."
                                        {...register("workspace_name")}
                                    />
                                    {!isEmpty(errors.workspace_name) && (
                                        <FieldError
                                            className="mx-auto text-xs"
                                            errors={[
                                                {
                                                    message:
                                                        errors.workspace_name
                                                            ?.message,
                                                },
                                            ]}
                                        />
                                    )}
                                </Field>

                                <div className="py-4 text-muted-foreground space-y-1 text-xs">
                                    <p>Password must:</p>
                                    <ul className="list-disc pl-5">
                                        <li>Be at least 8 characters long</li>
                                        <li>
                                            Include an uppercase letter (A–Z)
                                        </li>
                                        <li>
                                            Include a lowercase letter (a–z)
                                        </li>
                                        <li>Include a number (0–9)</li>
                                        <li>
                                            Include a special character
                                            (!@#$...)
                                        </li>
                                    </ul>
                                </div>
                            </Field>
                            {!isEmpty(errors.form) && (
                                <FieldError
                                    className="mx-auto text-xs"
                                    errors={[
                                        {
                                            message: errors.form?.message,
                                        },
                                    ]}
                                />
                            )}
                            <Field>
                                <Button type="submit" disabled={isPending}>
                                    {isPending
                                        ? "Creating your account..."
                                        : "Create your account"}
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account?{" "}
                                    <Link to="/login">Sign in</Link>
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
