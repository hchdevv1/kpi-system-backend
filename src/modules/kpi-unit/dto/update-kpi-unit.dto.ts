/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateKPIUnitDto {

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'อัตราต่อ 100' })
  description?: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  symbol?: string | null;

   @ApiProperty({ example: '100' })
  @IsOptional()
  scale_factor?: string | null;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ example: true, description: 'Flag to enable or disable this kpi-unit' })
  is_active?: boolean;

@IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ example: true, description: 'Flag to enable or disable this display percent' })
  is_percent?: boolean;
}