export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
}

export type ProductCardVariant =
  | {
      variant: "compact";
    }
  | {
      variant: "full";
    };
