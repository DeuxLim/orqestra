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
            lazy: load(() => import("@/features/auth/routes/register")),
        },
        {
            path: "/login",
            lazy: load(() => import("@/features/auth/routes/login")),
        },
    ]);
