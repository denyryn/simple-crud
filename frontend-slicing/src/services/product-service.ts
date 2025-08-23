import type { ApiResponse } from "@/types/api-response-type";
import { apiFetch } from "./api";
import type { Product } from "@/types/product-type";

type ProductResponse = { product: Product; intent: string };

export default class ProductService {
  static async fetchAll(): Promise<ApiResponse<Product[]>> {
    const response = await apiFetch<Product[]>("/products", {
      method: "GET",
      auth: true,
    });

    if (response.status === "error") {
      throw new Error(response.message ?? "Failed to fetch products");
    }

    return response;
  }

  static async fetchById(id: string): Promise<ApiResponse<Product>> {
    const response = await apiFetch<Product>(`/products/${id}`, {
      method: "GET",
      auth: true,
    });

    if (response.status === "error") {
      throw new Error(response.message ?? "Failed to fetch product");
    }

    if (!response.data) {
      throw new Error("Product not found");
    }

    return response;
  }

  static async create(
    intent: string,
    product: Omit<Product, "id">,
  ): Promise<ApiResponse<ProductResponse>> {
    console.log("Creating product", product);

    const response = await apiFetch<ProductResponse>("/products", {
      method: "POST",
      body: JSON.stringify(product),
    });

    console.log("product response", response);

    if (response.status === "error") {
      throw new Error(response.message ?? "Failed to create product");
    }

    if (!response.data) {
      throw new Error("No product returned from API");
    }

    response.data = { ...response.data, intent: intent };

    console.log("product response with intent", response);

    return response;
  }

  static async update(
    intent: string,
    id: string,
    product: Omit<Product, "id">,
  ): Promise<ApiResponse<ProductResponse>> {
    console.log(`Updating product with id: ${id}`, product);

    const response = await apiFetch<ProductResponse>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
      auth: true,
    });

    console.log("product response", response);

    if (response.status === "error") {
      console.error("product update error", response);
      throw new Error(response.message ?? "Failed to update product");
    }

    if (!response.data) {
      throw new Error("No product returned from API");
    }

    response.data = { ...response.data, intent: intent };

    console.log("product response with intent", response);

    return response;
  }

  static async delete(id: string): Promise<Object> {
    const response = await apiFetch<void>(`/products/${id}`, {
      method: "DELETE",
      auth: true,
    });

    return response;
  }
}
