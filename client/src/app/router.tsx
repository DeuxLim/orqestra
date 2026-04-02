import type { ComponentType } from "react";
import { createBrowserRouter } from "react-router";
import RouteErrorBoundary from "@/app/routes/errors/RouteErrorBoundary";

const load =
    (importer: () => Promise<{ default: ComponentType }>) => async () => {
        const module = await importer();
        return { Component: module.default };
    };

export const createAppRouter = () =>
    createBrowserRouter([
        {
            path: "/",
            errorElement: <RouteErrorBoundary />,
            children: [
                {
                    index: true,
                    lazy: load(
                        () => import("@/app/routes/landing-page/LandingPage"),
                    ),
                },
                {
                    lazy: load(
                        () => import("@/app/routes/auth/AuthRouteLayout"),
                    ),
                    children: [
                        {
                            path: "register",
                            lazy: async () => {
                                const [module, authLoaders] = await Promise.all([
                                    import("@/app/routes/auth/Register"),
                                    import("@/features/auth/auth.loader"),
                                ]);

                                return {
                                    Component: module.default,
                                    loader: authLoaders.redirectIfAuthenticatedLoader,
                                };
                            },
                        },
                        {
                            path: "login",
                            lazy: async () => {
                                const [module, authLoaders] = await Promise.all([
                                    import("@/app/routes/auth/Login"),
                                    import("@/features/auth/auth.loader"),
                                ]);

                                return {
                                    Component: module.default,
                                    loader: authLoaders.redirectIfAuthenticatedLoader,
                                };
                            },
                        },
                        {
                            path: "check-email",
                            lazy: load(() => import("@/app/routes/auth/CheckEmail")),
                        },
                        {
                            path: "email-verified",
                            lazy: load(
                                () => import("@/app/routes/auth/EmailVerified"),
                            ),
                        },
                    ],
                },
                {
                    path: "dashboard",
                    lazy: async () => {
                        const [module, authLoaders] = await Promise.all([
                            import("@/app/routes/dashboard/Dashboard"),
                            import("@/features/auth/auth.loader"),
                        ]);

                        return {
                            Component: module.default,
                            loader: authLoaders.requireAuthLoader,
                        };
                    },
                },
                {
                    path: "*",
                    lazy: load(() => import("@/app/routes/not-found/NotFound")),
                },
            ],
        },
    ]);
