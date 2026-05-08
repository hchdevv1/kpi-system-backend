/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateFrequencyDto {

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'Updated frequency description' })
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'Updated frequency value' })
  interval_value?: number;



  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ example: true, description: 'Flag to enable or disable this frequency' })
  is_active?: boolean;
}