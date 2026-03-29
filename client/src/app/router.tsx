import { createBrowserRouter } from "react-router";

const load = (importer: () => Promise<any>) => async () => {
	const module = await importer();
	return { Component: module.default };
};

export const createAppRouter = () =>
	createBrowserRouter([
		{
			path: "/register",
			lazy: load(() => import("@/app/routes/auth/register")),
		},
	]);
