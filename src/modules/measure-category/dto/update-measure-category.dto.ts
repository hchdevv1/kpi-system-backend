/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateMeasureCategoryDto {

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'Updated measure category description' })
  description?: string;


  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ example: true, description: 'Flag to enable or disable this measure category' })
  is_active?: boolean;
}