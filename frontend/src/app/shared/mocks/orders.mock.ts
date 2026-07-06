import { Order } from '../../modules/orders/models/order.model';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';

export const ORDERS_MOCK: Order[] = [
  {
    id: '1',
    externalRef: 'MAT-2026-001',
    originService: 'MATRICULA',
    amount: 150000,
    currency: 'CLP',
    description: 'Pago matrícula semestre 1 2026',
    status: OrderStatus.PAID,
    paymentMethod: PaymentMethod.CARD,
    createdAt: '2026-04-20T10:30:00',
    updatedAt: '2026-04-20T10:45:00',
    paidAt: '2026-04-20T10:45:00'
  },
  {
    id: '2',
    externalRef: 'MAT-2026-002',
    originService: 'MATRICULA',
    amount: 150000,
    currency: 'CLP',
    description: 'Pago matrícula semestre 1 2026',
    status: OrderStatus.PENDING,
    createdAt: '2026-04-21T09:00:00',
    updatedAt: '2026-04-21T09:00:00'
  },
  {
    id: '3',
    externalRef: 'BIB-2026-001',
    originService: 'BIBLIOTECA',
    amount: 5000,
    currency: 'CLP',
    description: 'Multa préstamo libro atrasado',
    status: OrderStatus.PAID,
    paymentMethod: PaymentMethod.WALLET,
    createdAt: '2026-04-22T11:00:00',
    updatedAt: '2026-04-22T11:15:00',
    paidAt: '2026-04-22T11:15:00'
  },
  {
    id: '4',
    externalRef: 'CAF-2026-001',
    originService: 'CAFETERIA',
    amount: 3500,
    currency: 'CLP',
    description: 'Almuerzo semana 17',
    status: OrderStatus.REJECTED,
    rejectionReason: 'Fondos insuficientes en billetera',
    createdAt: '2026-04-23T12:30:00',
    updatedAt: '2026-04-23T12:31:00'
  },
  {
    id: '5',
    externalRef: 'MAT-2026-003',
    originService: 'MATRICULA',
    amount: 25000,
    currency: 'CLP',
    description: '',
    status: OrderStatus.PAID,
    createdAt: '2026-04-24T08:00:00',
    updatedAt: '2026-04-24T08:30:00'
  },
  {
    id: '6',
    externalRef: 'MAT-2026-003',
    originService: 'MATRICULA',
    amount: 150000,
    currency: 'CLP',
    description: 'Pago matrícula semestre 1 2026',
    status: OrderStatus.PENDING,
    createdAt: '2026-04-25T14:00:00',
    updatedAt: '2026-04-25T14:00:00'
  },
  {
    id: '7',
    externalRef: 'BIB-2026-002',
    originService: 'BIBLIOTECA',
    amount: 12000,
    currency: 'CLP',
    description: 'Reposición libro dañado',
    status: OrderStatus.PAID,
    paymentMethod: PaymentMethod.TRANSFER,
    createdAt: '2026-04-26T10:00:00',
    updatedAt: '2026-04-26T10:20:00',
    paidAt: '2026-04-26T10:20:00'
  },
  {
    id: '8',
    externalRef: 'DEP-2026-001',
    originService: 'CAFETERIA',
    amount: 8000,
    currency: 'CLP',
    description: 'PAGO DE MENU',
    status: OrderStatus.PENDING,
    createdAt: '2026-04-27T09:00:00',
    updatedAt: '2026-04-27T09:00:00'
  }
];