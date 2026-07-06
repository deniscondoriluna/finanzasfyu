import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GetTokenDto {
  @ApiProperty({ example: 'pk_matricula_xxxx', description: 'Private key del sistema' })
  @IsString()
  @IsNotEmpty()
  privateKey: string;
}