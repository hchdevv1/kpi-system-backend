/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsBoolean, IsInt } from 'class-validator';

export class UpdateUserSystemDto {

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  id!: number

  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  @IsInt()
  usersystem_role_id!: number;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ example: true, description: 'Flag to enable or disable this user' })
  is_active?: boolean;
}