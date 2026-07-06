import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GetTokenDto } from './dto/get-token.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { OriginService } from '../common/enums/payment-status.enum';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class GenerateKeyDto {
  @ApiProperty({ enum: OriginService })
  @IsEnum(OriginService)
  service: OriginService;
}

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar usuario administrador' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login administrador - obtener JWT' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('token')
  @ApiOperation({ summary: 'Obtener token JWT mediante private key del sistema' })
  getToken(@Body() dto: GetTokenDto) {
    return this.authService.getTokenByPrivateKey(dto);
  }

  @Post('generate-key')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generar API key para un sistema - solo admin' })
  generateKey(@Body() dto: GenerateKeyDto) {
    return this.authService.generateApiKey(dto.service);
  }
}