// interface ShoppingHeaderProps {}

import { Link, useNavigate } from "react-router-dom";
import { ApplicationRoutes } from "../../router/appRoutes";
import HeaderLink from "./HeaderLink";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { authActions } from "../../store/slices/auth-slice";

export default function ShoppingHeader() {
	// Store state getters
	const isLoggedIn: boolean = useSelector((state: RootState) => state?.auth?.isLoggedIn);
	const username: string | null = useSelector((state: RootState) => state?.auth?.username);

	// Redux
	const dispatche = useDispatch();
	const navigate = useNavigate();

	// Functions
	const logout = () => {
		dispatche(authActions.logout());
		navigate(ApplicationRoutes.LOGIN_PAGE);
	};

	return (
		<header className="bg-white columns-2 gap-3 p-6 shadow-md ">
			<div className="flex items-center ">
				<HeaderLink text="Shop" to={ApplicationRoutes.SHOP_PAGE} />
				<HeaderLink text="Cart" to={ApplicationRoutes.CART_PAGE} />
			</div>

			<div className="flex items-center justify-end gap-3">
				{isLoggedIn ? (
					<>
						<span className="font-bold">
							Welcome <span className="capitalize italic font-medium">{username} !</span>
						</span>

						<span onClick={logout} className="text-blue-600/100 cursor-pointer">
							Logout
						</span>
					</>
				) : (
					<Link to={ApplicationRoutes.LOGIN_PAGE}>Log in</Link>
				)}{" "}
				<span aria-hidden="true">&rarr;</span>
				{/* <Link to={ApplicationRoutes.LOGIN_PAGE}>Log in</Link> <span aria-hidden="true">&rarr;</span> */}
			</div>
		</header>
	);
}
