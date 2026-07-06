import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../../common/enums/payment-status.enum';

export class ConfirmPaymentDto {
  @ApiProperty({ enum: [PaymentStatus.APPROVED, PaymentStatus.REJECTED] })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({ example: 'Fondos insuficientes', required: false })
  @IsString()
  @IsOptional()
  rejectionReason?: string;
}