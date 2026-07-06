import { PaymentMethod } from '../../../shared/enums/payment-method.enum';

export interface PaymentRequestDto {
  orderId:        number;
  paymentMethod:  PaymentMethod;
  // Tarjeta
  cardNumber?:    string;
  cardHolder?:    string;
  expiryDate?:    string;
  cvv?:           string;
  // Transferencia
  bankName?:      string;
  accountNumber?: string;
  holderDoc?:     string;
  // Billetera
  walletId?:      string;
  walletPin?:     string;
}