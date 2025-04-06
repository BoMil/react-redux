import { Outlet } from "react-router-dom";
import ShoppingHeader from "../header/ShoppingHeader";
import { useEffect } from "react";
import CartPage from "../cart/CartPage";

const LandingPage = () => {
	// This will be called once when the component is mounted
	useEffect(() => {
		console.log("App is mounted");
		// navigate(ApplicationRoutes.SHOP_PAGE);
	});

	return (
		<>
			<ShoppingHeader />
			{/* Will be displayed on the right side */}
			<CartPage />
			<Outlet />
		</>
	);
};

export default LandingPage;
