import { Outlet, useNavigate } from "react-router-dom";
import ShoppingHeader from "../header/ShoppingHeader";
import { useEffect } from "react";

interface LandingPageProps {}

const LandingPage = (props: LandingPageProps) => {
	// This will be called once when the component is mounted
	useEffect(() => {
		console.log("App is mounted");
		// navigate(ApplicationRoutes.SHOP_PAGE);
	});

	return (
		<>
			<ShoppingHeader />
			{/* <h1 className="text-center text-[20px]">Landing Page</h1> */}

			<Outlet />
		</>
	);
};

export default LandingPage;
