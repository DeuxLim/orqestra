import { useMemo } from "react";
import { createAppRouter } from "@/app/routes";
import { RouterProvider } from "react-router";

export const AppRouter = () => {
	const router = useMemo(() => createAppRouter(), []);

	return <RouterProvider router={router} />;
};
