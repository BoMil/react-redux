import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../services/apiServices/authApiService";
import "./Login.scss";
import { authActions } from "../../store/slices/auth-slice";
import { RootState } from "../../store/store";
import { User } from "../../models/user";
import { useNavigate } from "react-router-dom";
import { ApplicationRoutes } from "../../router/appRoutes";

interface LoginProps {}
// {
//     "username": "johnd",
//     "password": "m38rmF$"
//   }
const Login = (props: LoginProps) => {
	const isLoggedIn: boolean = useSelector((state: RootState) => state?.auth?.isLoggedIn);

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	// const [loading, setLoading] = useState<boolean>(false);
	const [login, { isLoading }] = useLoginMutation();

	// Redux
	const dispatche = useDispatch();
	const navigate = useNavigate();
	// This will be called once when the component is mounted
	useEffect(() => {
		console.log("Login page is mounted");
		if (isLoggedIn) {
			navigate(ApplicationRoutes.DASHBOARD_PAGE);
		}
		// navigate(ApplicationRoutes.SHOP_PAGE);
	});

	const handleSubmit = async () => {
		console.log(username);

		if (!username || !password) {
			return;
		}
		// e.preventDefault();
		// setLoading(true);

		try {
			const response = await login({
				username,
				password,
			}).unwrap();
			console.log(response);
			// const user: User = new User(response);
			setError("");

			dispatche(authActions.login(username));
			navigate(ApplicationRoutes.DASHBOARD_PAGE);
			// alert("Login Successful");
			// setLoading(false);
		} catch (error) {
			console.error(error);
			setError("Invalid username or password");
			// setLoading(false);
		}
	};

	return (
		<>
			<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img className="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
					<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
					<h2> Is logged in: {isLoggedIn ? "Yes" : "No"}</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<div className="space-y-6">
						<div>
							<label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
								Username
							</label>
							<div className="mt-2">
								<input
									onChange={(e) => setUsername(e.target.value)}
									type="text"
									name="username"
									id="username"
									autoComplete="username"
									required
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
									Password
								</label>
								<div className="text-sm">
									<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
										Forgot password?
									</a>
								</div>
							</div>
							<div className="mt-2">
								<input
									onChange={(e) => setPassword(e.target.value)}
									type="password"
									name="password"
									id="password"
									autoComplete="current-password"
									required
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div>
							{isLoading ?? <span>Loading...</span>}
							<button
								onClick={handleSubmit}
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								Sign in
							</button>
						</div>
					</div>

					<p className="mt-10 text-center text-sm/6 text-gray-500">
						Not a member?
						<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
							Start a 14 day free trial
						</a>
					</p>
					{error && <div className="error-msg">{error}</div>}
				</div>
			</div>
		</>
	);
};

export default Login;
