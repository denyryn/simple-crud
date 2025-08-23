import { useEffect, useState } from "react";
import { useLoaderData, Form } from "react-router";
import { useNotification } from "@/contexts/notification";
import type { Product } from "@/types/product-type";
import ProductForm from "./components/product-form";
import Modal from "@/components/modal";
import type { ApiResponse } from "@/types/api-response-type";

export default function ProductPage() {
  const { setNotification } = useNotification();
  const response = useLoaderData() as ApiResponse<Product[]>;
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const openCreateModal = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  useEffect(() => {
    if (response?.status === "error") {
      setNotification({
        type: "error",
        title: "Error Occurred",
        message: response.errors
          ? Object.values(response.errors).flat().join(", ")
          : "Unknown error",
      });
    }

    if (response?.status === "success") {
      setNotification({
        type: "success",
        title: "Success",
        message: response.message || "Operation completed successfully",
      });
    }
  }, [response, setNotification]);

  return (
    <div className="p-2 xl:p-6">
      <h1 className="text-foreground mb-6 text-2xl font-bold">Products</h1>

      <button
        onClick={openCreateModal}
        className="bg-primary text-background hover:bg-primary/80 mb-4 rounded-md px-4 py-2"
      >
        Add Product
      </button>

      <div className="overflow-x-auto rounded-2xl border shadow">
        <table className="bg-background text-foreground w-full border-collapse text-left text-sm">
          <thead className="bg-background/80 text-foreground/95 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Description</th>
              <th className="px-6 py-4 font-semibold">Image URL</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-background/70 divide-y">
            {response.data?.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-foreground/10 transition-colors"
              >
                <td className="text-foreground px-6 py-4 font-medium">
                  {p.name}
                </td>
                <td className="px-6 py-4">
                  {p.description ?? (
                    <span className="text-foreground/65 italic">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {p.imageUrl ? (
                    <a
                      href={p.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {p.price ? (
                    `$${p.price}`
                  ) : (
                    <span className="text-gray-400 italic">-</span>
                  )}
                </td>
                <td className="flex items-center gap-2 px-6 py-4">
                  <button
                    className="text-foreground bg-transparent hover:underline"
                    onClick={() => openEditModal(p)}
                  >
                    Edit
                  </button>

                  <Form
                    method="delete"
                    onSubmit={(e) => {
                      if (
                        !confirm(
                          "Are you sure you want to delete this product?",
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <input type="hidden" name="intent" value="delete" />
                    <input type="hidden" name="id" value={p.id} />
                    <button
                      type="submit"
                      className="bg-transparent text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingProduct ? "Update Product" : "Create Product"}
      >
        <ProductForm
          product={editingProduct ?? undefined}
          onClose={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
