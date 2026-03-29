import { createBrowserRouter } from "react-router";

export const createAppRouter = () =>
	createBrowserRouter([
		{
			path: "/",
			element: <div>Frontend is up!</div>,
		},
	]);
