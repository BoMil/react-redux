import { createBrowserRouter } from "react-router-dom";
import ShopPage from "../components/shop/ShopPage";
import Login from "../components/login/Login";
import { ApplicationRoutes } from "./appRoutes";
import RouteDoesntExist from "./routeDoesntExist";
import LandingPage from "../components/landing/LandingPage";
import Dashboard from "../components/dashboard/dashboard";

const router = createBrowserRouter([
	{
		path: "",
		element: <LandingPage />,
		// index: true,
		children: [
			// Default route
			{
				path: "",
				element: <ShopPage />,
			},
			{
				path: ApplicationRoutes.LOGIN_PAGE,
				element: <Login />,
			},
			{
				path: ApplicationRoutes.SHOP_PAGE,
				element: <ShopPage />,
			},

			{
				path: ApplicationRoutes.DASHBOARD_PAGE,
				element: <Dashboard />,
			},
		],
	},

	// {
	// 	path: "*",
	// 	element: <LandingPage />,
	// },

	{
		path: "*",
		element: <RouteDoesntExist />,
	},
]);

export default router;
