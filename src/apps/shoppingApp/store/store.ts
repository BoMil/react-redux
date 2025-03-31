import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import { apiSlice } from "./slices/api/api_slice";

export type RootState = ReturnType<typeof rootReducer>;

// Session storage for storing the state

const saveStateToSessionStorage = (state: RootState) => {
	try {
		const serializedState = JSON.stringify(state.auth);
		sessionStorage.setItem("reduxState", serializedState);
	} catch (err) {
		console.error("Could not save state to session storage:", err);
	}
};
const loadStateFromSessionStorage = (): Partial<RootState> | undefined => {
	try {
		const serializedState = sessionStorage.getItem("reduxState");
		if (serializedState === null) return undefined; // No state found
		return { auth: JSON.parse(serializedState) };
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
});

export const shopingAppStore = configureStore({
	reducer: rootReducer,
	preloadedState: persistedState,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

shopingAppStore.subscribe(() => {
	saveStateToSessionStorage(shopingAppStore.getState());
});

export type AppDispatch = typeof shopingAppStore.dispatch;
