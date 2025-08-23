import { useState, useEffect } from "react";
import type { Product } from "@/types/product-type";
import { Form, useNavigation } from "react-router";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

interface ProductFormProps {
  product?: Product; // for editing
  onClose?: () => void; // optional close handler
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [formData, setFormData] = useState<Product>({
    id: product?.id || "",
    name: product?.name || "",
    description: product?.description || "",
    imageUrl: product?.imageUrl || "",
    price: product?.price || 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        description: product.description ?? "",
        imageUrl: product.imageUrl ?? "",
        price: product.price ?? 0,
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  return (
    <Form method="post">
      {/* Hidden ID field */}
      <Input
        type="hidden"
        name="id"
        value={formData.id}
        onChange={handleChange}
      />

      {/* Hidden Intent field */}
      <Input
        type="hidden"
        name="intent"
        value={product ? "update" : "create"}
      />

      {/* Name */}
      <Input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
      />

      {/* Description */}
      <Input
        type="text"
        name="description"
        placeholder="Product Description"
        value={formData.description}
        onChange={handleChange}
      />

      {/* Image URL */}
      <Input
        type="text"
        name="imageUrl"
        placeholder="Product Image URL"
        value={formData.imageUrl}
        onChange={handleChange}
      />

      {/* Price */}
      <Input
        type="number"
        name="price"
        placeholder="Product Price"
        value={formData.price}
        onChange={handleChange}
      />

      <div className="mt-4 flex justify-end gap-2">
        {onClose && (
          <Button type="button" isActive={true} onClick={onClose}>
            Cancel
          </Button>
        )}
        <Button type="submit" isActive={!isSubmitting}>
          {isSubmitting
            ? product
              ? "Updating..."
              : "Adding..."
            : product
              ? "Update Product"
              : "Add Product"}
        </Button>
      </div>
    </Form>
  );
}
