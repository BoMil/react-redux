// interface ShopPageProps {}

import { useEffect, useState } from "react";
import { Product } from "../../models/product";
import { useGetAllProductsMutation } from "../../services/apiServices/productsApiService";
import ProductCard from "./components/ProductCard";
import { cartActions } from "../../store/slices/cart-slice";
import { useDispatch } from "react-redux";

// https://fakestoreapi.com
const ShopPage = () => {
	// State
	const [products, setProducts] = useState<Product[]>([]);

	// Redux
	const [getAllProducts] = useGetAllProductsMutation();
	const dispatche = useDispatch();

	const initShopState = async () => {
		console.log("initShopState", products.length);

		if (products.length > 0) {
			return;
		}
		try {
			const response = await getAllProducts().unwrap();
			const products: Product[] = response.map((product: any) => new Product(product));

			setProducts(products);
			console.log("Products: ", products);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		console.log("Shop page is mounted");
		initShopState();
	}, []);

	const addProductToCart = (product: Product) => {
		console.log("addProductToCart", product);
		dispatche(cartActions.addToCart(product));
	};

	return (
		<>
			<div className="flex flex-row flex-wrap justify-center gap-2 p-3">
				{/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3"> */}
				{products.map((product: Product) => (
					<ProductCard key={product.id} product={product} addToCart={(product: Product) => addProductToCart(product)} />
				))}
			</div>
		</>
	);
};

export default ShopPage;
