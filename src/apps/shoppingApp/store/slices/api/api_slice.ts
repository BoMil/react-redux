import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "./custom_slice";

export const apiSlice = createApi({
	reducerPath: "apiSlice",
	baseQuery: customBaseQuery,
	tagTypes: [
		"Auth",
		"Products"
	],
	endpoints: builder => ({}),
});