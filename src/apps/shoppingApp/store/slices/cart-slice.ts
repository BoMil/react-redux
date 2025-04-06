import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/product";

export interface ShopCartState {
    products: Product[];
    isCartOpend: boolean;
}

function setInitialState(): ShopCartState {
    return {
        products: [],
        isCartOpend: false,
    }
}

// Slice - kriska, parce
const cartSlice = createSlice({
	name: "cart",
	initialState:  setInitialState(),
	reducers: {
		addToCart: (state, action: PayloadAction<Product>) => {
            // First check if product already exists
            const index = state.products.findIndex((product: Product) => product.id === action.payload.id);
            // state.isCartOpend = state.isCartOpend;
            if (index !== -1) {
                const updatedProduct = {
                    ...state.products[index],
                    cartQuantity: state.products[index].cartQuantity + 1,
                };
                state.products[index] = updatedProduct;
                return;
            };
			state.products.push(action.payload)

		},
        removeFromCart: (state, action: PayloadAction<Product>) => {
            // First check if product is in cart and has cartQuantity > 1  
            const index = state.products.findIndex((product: Product) => product.id === action.payload.id);
            if (index === -1) {
                return;
            };

            if (state.products[index].cartQuantity > 1) {
                const updatedProduct = {
                    ...state.products[index],
                    cartQuantity: state.products[index].cartQuantity - 1,
                };
                state.products[index] = updatedProduct;
                return;
            };
            state.products.splice(index, 1);
        },

        setCartOpened: (state, action: PayloadAction<boolean>) => {
            state.isCartOpend = action.payload;
        },
	},
});


export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
