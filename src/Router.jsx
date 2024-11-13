import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Games } from "./components/Games";
import { Login } from "./pages/Login";

export function Router() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout></Layout>,
			children: [{ index: true, element: <Games></Games> }],
		},
		{ path: "/login", element: <Login></Login> },
	]);
	return <RouterProvider router={router}></RouterProvider>;
}
