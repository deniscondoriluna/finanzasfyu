import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Payments')
@Controller({ path: 'payments', version: '1' })
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('orders')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear orden de pago' })
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener todos los pagos' })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':referenceId')
  @ApiOperation({ summary: 'Consultar estado de pago por referencia' })
  findOne(@Param('referenceId') referenceId: string) {
    return this.paymentsService.findByReference(referenceId);
  }

  @Patch(':referenceId/confirm')
  @ApiOperation({ summary: 'Confirmar o rechazar un pago' })
  confirm(
    @Param('referenceId') referenceId: string,
    @Body() dto: ConfirmPaymentDto
  ) {
    return this.paymentsService.confirm(referenceId, dto);
  }
}