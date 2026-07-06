import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreatePaymentPayload {
  referenceId: string;
  originService: string;
  amount: number;
  paymentMethod: string;
  callbackUrl: string;
  description: string;
}

export interface ConfirmPaymentPayload {
  status: 'APPROVED' | 'REJECTED';
  rejectionReason?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly apiUrl = 'http://localhost:3000/v1/payments';

  constructor(private http: HttpClient) {}

  createOrder(payload: CreatePaymentPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, payload);
  }

  getPayment(referenceId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${referenceId}`);
  }

  confirmPayment(
    referenceId: string,
    payload: ConfirmPaymentPayload
  ): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/${referenceId}/confirm`,
      payload
    );
  }
}