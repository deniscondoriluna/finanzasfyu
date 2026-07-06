import { OrderStatus }   from '../../../shared/enums/order-status.enum';
import { PaymentMethod } from '../../../shared/enums/payment-method.enum';

export interface Order {
  id:               string;
  externalRef:      string;
  originService:    string;
  amount:           number;
  currency:         string;
  description:      string;
  status:           OrderStatus;
  paymentMethod?:   string;
  rejectionReason?: string;
  callbackUrl?:     string;
  createdAt:        string;
  updatedAt:        string;
  paidAt?:          string;
}