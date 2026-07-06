import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PaymentStatus, OriginService } from '../../common/enums/payment-status.enum';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  referenceId: string; // idempotencia - evita doble cobro

  @Column({ type: 'enum', enum: OriginService })
  originService: OriginService;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @Column({ nullable: true })
  paymentMethod: string; // 'TARJETA' | 'TRANSFERENCIA' | 'BILLETERA'

  @Column({ nullable: true })
  rejectionReason: string;

  @Column({ nullable: true })
  callbackUrl: string; // URL del sistema que llama para notificarle el resultado

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}