import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { PaymentStatus } from '../common/enums/payment-status.enum';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async create(dto: CreatePaymentDto): Promise<Payment> {
    // idempotencia - evita doble cobro
    const exists = await this.paymentRepo.findOne({ where: { referenceId: dto.referenceId } });
    if (exists) throw new ConflictException('Ya existe una orden con ese referenceId');

    const payment = this.paymentRepo.create(dto);
    return this.paymentRepo.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepo.find();
  }

  async findByReference(referenceId: string): Promise<Payment> {
    const payment = await this.paymentRepo.findOne({ where: { referenceId } });
    if (!payment) throw new NotFoundException('Pago no encontrado');
    return payment;
  }

  async confirm(referenceId: string, dto: ConfirmPaymentDto): Promise<Payment> {
    const payment = await this.findByReference(referenceId);

    if (payment.status !== PaymentStatus.PENDING)
      throw new ConflictException('Esta orden ya fue procesada');

    payment.status = dto.status;
    payment.rejectionReason = dto.rejectionReason ?? null;

    return this.paymentRepo.save(payment);
  }
}