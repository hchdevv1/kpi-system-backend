/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateKPIUnitDto {

  @ApiProperty({ example: 'อัตราต่อ 100' })
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  symbol?: string | null;

  @ApiProperty({ example: '100' })
  @IsOptional()
  scale_factor?: string | null;
}