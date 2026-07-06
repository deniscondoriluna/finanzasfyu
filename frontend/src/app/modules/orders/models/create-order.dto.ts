export interface CreateOrderDto {
  externalRef:   string;
  originService: string;
  amount:        number;
  currency:      string;
  description:   string;
}