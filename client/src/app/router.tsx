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
            path: "/register",
            lazy: load(() => import("@/app/routes/auth/Register")),
        },
        {
            path: "/login",
            lazy: load(() => import("@/app/routes/auth/Login")),
        },
    ]);
