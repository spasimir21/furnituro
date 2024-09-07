interface OrderedProduct {
  productId: string;
  quantity: number;
  priceForOne: number;
  size: string;
  color: string;
}

interface Order {
  id: string;
  customer: {
    name: {
      first: string;
      last: string;
    };
    company: string | null;
    phoneNumber: string;
    email: string;
  };
  address: {
    country: string;
    city: string;
    address: string;
    postalCode: number;
  };
  products: OrderedProduct[];
  totalPrice: number;
  extraInformation: string | null;
  isPaid: boolean;
}

export { Order, OrderedProduct };

