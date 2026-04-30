/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateBenchmarkDto {

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'Updated benchmark description' })
  description?: string;


  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ example: true, description: 'Flag to enable or disable this benchmark' })
  is_active?: boolean;
}