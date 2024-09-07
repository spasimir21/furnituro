interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  discount: number;
  originalPrice: number;
  quantity: number;
  isNew: boolean;
  coverPhoto: string;
  additionalPhotos: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  categories: string[];
}

export { Product };

