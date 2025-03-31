
import { Product } from "../../models/product";
import { apiSlice } from "../../store/slices/api/api_slice";

export const productsApiService = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.mutation<Product[],void>({
            query: () => ({
                url: "fakestoreapi.com/products",
                method: "GET",
            }),
            // invalidatesTags: ["Products"],
        }),

    }),
});

export const { useGetAllProductsMutation } = productsApiService;