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
            element: <>Landing Page</>,
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
            path: "/orqestra/dashboard",
            element: <div>DASHBOARD PAGE</div>,
        },
    ]);
