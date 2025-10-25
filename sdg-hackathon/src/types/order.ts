import { Artwork } from './artwork';

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  userId?: string;
}
