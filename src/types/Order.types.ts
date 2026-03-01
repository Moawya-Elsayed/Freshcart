export interface Order {
  _id: string;
  totalOrderPrice: number;
  shippingPrice?: number;
  taxPrice?: number;

  paymentMethodType?: "cash" | "card";
  isPaid?: boolean;
  isDelivered: boolean;
  
  createdAt: string;

    user?: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
  };

  shippingAddress?: {
    details?: string;
    phone?: string;
    city?: string;
  };

  cartItems: CartItem[];
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;

  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
}