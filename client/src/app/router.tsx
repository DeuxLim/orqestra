import { createBrowserRouter } from "react-router";

export const createAppRouter = () =>
	createBrowserRouter([
		{
			path: "/register",
			lazy: async () => {
				const module = await import("@/app/routes");
				return { Component: module.default };
			},
		},
	]);
