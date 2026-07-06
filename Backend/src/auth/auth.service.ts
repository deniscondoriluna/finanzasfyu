import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { ApiKey } from './entities/api-key.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GetTokenDto } from './dto/get-token.dto';
import { OriginService } from '../common/enums/payment-status.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(ApiKey)
    private readonly apiKeyRepo: Repository<ApiKey>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('El email ya está registrado');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashed });
    await this.userRepo.save(user);

    return { message: 'Usuario registrado correctamente' };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }

  async getTokenByPrivateKey(dto: GetTokenDto) {
    const apiKey = await this.apiKeyRepo.findOne({ 
      where: { privateKey: dto.privateKey, isActive: true } 
    });
    if (!apiKey) throw new UnauthorizedException('Private key inválida o inactiva');

    const payload = { sub: apiKey.id, service: apiKey.service };
    const token = this.jwtService.sign(payload, { expiresIn: '1m' }); // token de 5 minutos

    return { access_token: token, service: apiKey.service };
  }
  async generateApiKey(service: OriginService) {
  const privateKey = `pk_${service.toLowerCase()}_${Math.random().toString(36).substring(2, 15)}`;
  
  const apiKey = this.apiKeyRepo.create({ privateKey, service });
  await this.apiKeyRepo.save(apiKey);

  return { privateKey, service };
}
}