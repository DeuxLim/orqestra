import type { ComponentType } from "react";
import { createBrowserRouter } from "react-router";

const load =
    (importer: () => Promise<{ default: ComponentType }>) => async () => {
        const module = await importer();
        return { Component: module.default };
    };

export const createAppRouter = () =>
    createBrowserRouter([
        {
            index: true,
            lazy: load(() => import("@/app/routes/landing-page/LandingPage")),
        },
        {
            path: "/register",
            lazy: load(() => import("@/app/routes/auth/Register")),
        },
        {
            path: "/login",
            lazy: load(() => import("@/app/routes/auth/Login")),
        },
        {
            path: "/check-email",
            lazy: load(() => import("@/app/routes/auth/CheckEmail")),
        },
        {
            path: "/email-verified",
            lazy: load(() => import("@/app/routes/auth/EmailVerified")),
        },
        {
            path: "/dashboard",
            lazy: load(() => import("@/app/routes/dashboard/Dashboard")),
        },
    ]);
