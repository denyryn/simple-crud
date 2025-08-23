export interface Product {
  id: string;
  name: string;
  description?: string | null | undefined;
  imageUrl?: string | null | undefined;
  price?: number | null | undefined;
}
