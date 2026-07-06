import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Min } from 'class-validator';
import { OriginService } from '../../common/enums/payment-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 'MAT-2024-001', description: 'ID único del servicio origen' })
  @IsString()
  @IsNotEmpty()
  referenceId: string;

  @ApiProperty({ enum: OriginService, example: OriginService.MATRICULA })
  @IsEnum(OriginService)
  originService: OriginService;

  @ApiProperty({ example: 500.00 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ example: 'TARJETA', enum: ['TARJETA', 'TRANSFERENCIA', 'BILLETERA'] })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @ApiProperty({ example: 'http://localhost:3001/api/payments/callback', required: false })
  @IsUrl()
  @IsOptional()
  callbackUrl?: string;

  @ApiProperty({ example: 'Pago matrícula semestre 1 2024', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}