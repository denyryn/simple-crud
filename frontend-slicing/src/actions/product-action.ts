import { type ActionFunctionArgs } from "react-router";
import ProductService from "@/services/product-service";
import type { Product } from "@/types/product-type";

export async function productAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = (formData.get("intent") ?? "") as string;
  const id = (formData.get("id") ?? "") as string;

  const priceValue = formData.get("price");
  const price = priceValue ? Number(priceValue) : undefined;

  const productData: Omit<Product, "id"> = {
    name: (formData.get("name") ?? "") as string,
    description: (formData.get("description") ?? undefined) as
      | string
      | undefined,
    imageUrl: (formData.get("imageUrl") ?? undefined) as string | undefined,
    price,
  };

  try {
    if ((intent === "update" || intent === "delete") && !id) {
      throw new Error("Product ID is required for update/delete");
    }

    console.log(
      `Processing product action with intent: ${intent}, id: ${id}`,
      productData,
    );

    switch (intent) {
      case "create":
        return await ProductService.create(intent, productData);
      case "update":
        return await ProductService.update(intent, id, productData);
      case "delete":
        return await ProductService.delete(id);
      default:
        throw new Error(`Unsupported intent: ${intent}`);
    }
  } catch (err) {
    return {
      intent,
      error: {
        message: err instanceof Error ? err.message : "Unexpected error",
      },
    };
  }
}
