import { createBrowserRouter } from "react-router";

import AppLayout from "@/layouts/app-layout";
import AuthLayout from "@/layouts/auth-layout";

import { productAction } from "@/actions/product-action";

import { authLoader } from "@/loaders/auth-loader";
import { productsLoader } from "@/loaders/product-loader";
import { requireAuthLoader } from "@/loaders/require-auth-loader";

import AuthPage, { authAction } from "@/pages/auth";
import ProductPage from "@/pages/product";
import Loading from "@/pages/loading";

const route = createBrowserRouter([
  {
    Component: AuthLayout,
    loader: authLoader,
    hydrateFallbackElement: <Loading />,
    children: [
      {
        path: "auth",
        element: <AuthPage />,
        action: authAction,
      },
    ],
  },

  {
    Component: AppLayout,
    loader: requireAuthLoader,
    hydrateFallbackElement: <Loading />,
    children: [
      {
        path: "/",
        element: <ProductPage />,
        loader: productsLoader,
        action: productAction,
      },
    ],
  },
]);

export default route;
