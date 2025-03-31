import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

const mutex = new Mutex();
// Custom base query function
const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
	function handleTokenExpiration() {
		// store.dispatch(tokenExpired());
		return new Promise(() => { }) as never;
	}

	const handleError401 = async (baseQuery: any) => {
		let result : any;

		if (!mutex.isLocked()) {
			const release = await mutex.acquire();

			try {
				const refreshResult = await baseQuery({
					url: "/user/auth/refresh",
					method: "POST",
					body: {
						refreshToken: sessionStorage.getItem("refreshToken"),
					},
				}, api, extraOptions);

				if (refreshResult.data) {
					// store.dispatch(logIn(refreshResult.data));					
					result = baseQuery(args, api, extraOptions);
				} else {
					result = handleTokenExpiration()
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);

			if (result.error && result.error.status === 401) {
				result = handleTokenExpiration();
			}
		}

		return result;
	};

	const handleError500 = () => {
		return {
			error: {
				status: 500,
				data: { title: "Something went wrong" },
			},
		};
	};

	const baseQuery = fetchBaseQuery({
		baseUrl: `https://`,
		// baseUrl: `${process.env.REACT_APP_SERVER_URL}/api/`,
		prepareHeaders: headers => {
			const token = sessionStorage.getItem("token");

			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	});

	await mutex.waitForUnlock();

	try {
		const result = await baseQuery(args, api, extraOptions);

		if (result.error && result.error.status === 401) {
			return handleError401(baseQuery);
		}

		if (result.error && result.error.status === 500) {
			return handleError500();
		}

		return result;
	} catch (error: any) {
		if (error.response?.status === 401) {
			return handleError401(baseQuery);
		} else if (error.response?.status === 500) {
			return handleError500();
		}

		return Promise.reject(error);
	}
};

export { customBaseQuery, mutex };