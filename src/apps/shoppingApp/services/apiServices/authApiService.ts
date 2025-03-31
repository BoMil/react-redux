import { IShopLoginRequest } from "../../interfaces/shopLoginRequest.interface";
import { IShopLoginResponse } from "../../interfaces/shopLoginResponse.interface";

import { apiSlice } from "../../store/slices/api/api_slice";

export const authApiService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IShopLoginResponse, IShopLoginRequest>({
            query: (body: IShopLoginRequest) => ({
                url: "fakestoreapi.com/auth/login",
                method: "POST",
                body,
            }),
            // invalidatesTags: ["Auth"],
        }),
    }),
});

export const { useLoginMutation } = authApiService;