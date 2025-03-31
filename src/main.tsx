import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { Provider } from "react-redux";
// import store from "../src/store/index.js";
import { RouterProvider } from "react-router-dom";
import router from "./apps/shoppingApp/router/appRouter.tsx";
import { shopingAppStore } from "./apps/shoppingApp/store/store.ts";

createRoot(document.getElementById("root")!).render(
	<Provider store={shopingAppStore}>
		<StrictMode>
			{/* <App /> */}
			<RouterProvider router={router} />
		</StrictMode>
	</Provider>
);
