import { Link, useNavigate } from "react-router-dom";
import { ApplicationRoutes } from "../../router/appRoutes";
import HeaderLink from "./HeaderLink";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { authActions } from "../../store/slices/auth-slice";
import { cartActions } from "../../store/slices/cart-slice";

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

	const setCartOpened = (isOpened: boolean) => {
		dispatche(cartActions.setCartOpened(isOpened));
	};

	return (
		<header className="bg-white columns-2 gap-3 p-6 shadow-md ">
			<div className="flex items-center ">
				<HeaderLink text="Shop" to={ApplicationRoutes.SHOP_PAGE} />
				<a className="cursor-pointer" onClick={() => setCartOpened(true)} target="_blank" rel="noreferrer">
					Cart
				</a>
				{isLoggedIn ? <HeaderLink text="Dashboard" to={ApplicationRoutes.DASHBOARD_PAGE} /> : <></>}
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
