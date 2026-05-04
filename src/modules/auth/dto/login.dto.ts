/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '611XXXX' })
  @IsString()
  usercode!: string;

  @ApiProperty({ example: 'XXXX' })
  @IsString()
  password!: string;
}