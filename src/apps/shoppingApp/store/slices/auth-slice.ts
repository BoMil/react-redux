import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShopLoginState {
    isLoggedIn: boolean;
    username: string;
}

function extractStateFromSessionStorage(): ShopLoginState {
    return {
        isLoggedIn: false,
        username: '',
    }
    // const stateFromStorage = sessionStorage.getItem('customer-registration-form')

    // return stateFromStorage ? JSON.parse(stateFromStorage) : {
    //     loading: false,
    //     currentStep: 1,
    //     finishedSteps: [],
    //     employmentInformation: {},
    //     financialInformation: {},
    //     identityInformation: {},
    //     personalInformation: {}
    // }
}
// Slice - kriska, parce
const authSlice = createSlice({
	name: "shopLogin",
	initialState:  extractStateFromSessionStorage(),
	reducers: {
		login: (state, action: PayloadAction<string>) => {
			state.isLoggedIn = true;
            state.username = action.payload;
			// state.userId = action.payload.userId;
			// state.token = action.payload.token;
		},
        logout: (state) => {
			state.isLoggedIn = false;
            state.username = '';

        }
	},
});
export const authActions = authSlice.actions;

export default authSlice.reducer;
