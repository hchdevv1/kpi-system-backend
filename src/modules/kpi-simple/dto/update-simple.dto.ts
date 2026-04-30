/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateSimpleDto {

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'Updated kpi simple description' })
  description?: string;


  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ example: true, description: 'Flag to enable or disable this kpi simple' })
  is_active?: boolean;
}