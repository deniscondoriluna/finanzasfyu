export interface Receipt {
  orderId:       number;
  folio:         string;
  externalRef:   string;
  originService: string;
  amount:        number;
  currency:      string;
  description:   string;
  paymentMethod: string;
  paidAt:        string;
}