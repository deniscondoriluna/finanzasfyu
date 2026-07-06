import { OrderStatus } from '../../../shared/enums/order-status.enum';

export interface PaymentResult {
  orderId:          number;
  status:           OrderStatus;
  rejectionReason?: string;
  processedAt:      string;
}