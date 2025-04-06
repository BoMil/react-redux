import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import { apiSlice } from "./slices/api/api_slice";
import cartSlice from "./slices/cart-slice";
import { SessionStateKeys } from "../enums/sessionStateKeys.enum";

// export type SessionStateKeys = "auth" | "cart";

export type RootState = ReturnType<typeof rootReducer>;

// Session storage for storing the state
const saveStateToSessionStorage = (state: RootState) => {
	try {
		const authState = JSON.stringify(state.auth);
		const cartState = JSON.stringify(state.cart);
		sessionStorage.setItem(SessionStateKeys.AUTH, authState);
		sessionStorage.setItem(SessionStateKeys.CART, cartState);
	} catch (err) {
		console.error("Could not save state to session storage:", err);
	}
};

const loadStateFromSessionStorage = (): Partial<RootState> | undefined => {
	try {
		const authState = sessionStorage.getItem(SessionStateKeys.AUTH);
		const cartState = sessionStorage.getItem(SessionStateKeys.CART);
		// console.log('cartState parsed',JSON.parse(cartState ?? ''));
		// if (serializedState === null) return undefined; // No state found
		return {
			auth: authState
				? JSON.parse(authState)
				: {
						isLoggedIn: false,
						username: "",
				  },
			cart: cartState
				? JSON.parse(cartState)
				: {
						products: [],
						isCartOpend: false,
				  },
		};
	} catch (err) {
		console.error("Could not load state from session storage:", err);
		return undefined;
	}
};

const persistedState: Partial<RootState> | undefined = loadStateFromSessionStorage();

// Store setup
const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	auth: authSlice,
	cart: cartSlice,
});

export const shopingAppStore = configureStore({
	reducer: rootReducer,
	preloadedState: persistedState,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
});

shopingAppStore.subscribe(() => {
	saveStateToSessionStorage(shopingAppStore.getState());
});

export type AppDispatch = typeof shopingAppStore.dispatch;
