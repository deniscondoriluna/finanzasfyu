import { OrderStatus } from '../../../shared/enums/order-status.enum';

export interface OrderFilterDto {
  status?:        OrderStatus;
  originService?: string;
  dateFrom?:      string;
  dateTo?:        string;
  page?:          number;
  limit?:         number;
}