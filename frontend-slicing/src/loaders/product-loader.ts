import ProductService from "@/services/product-service";
import type { LoaderFunctionArgs } from "react-router";

export async function productsLoader() {
  const products = await ProductService.fetchAll();
  return products;
}

export async function productLoader({ params }: LoaderFunctionArgs) {
  const productId = params.productId;

  if (!productId) {
    return null;
  }

  const product = await ProductService.fetchById(productId);
  return product;
}
