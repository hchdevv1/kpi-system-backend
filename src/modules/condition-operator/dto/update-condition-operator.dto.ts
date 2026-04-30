/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateConditionOperatorDto {

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'มากกว่า' })
  description?: string;

  @ApiProperty({ example: '>' })
  @IsOptional()
  symbol?: string | null;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ example: true, description: 'Flag to enable or disable this condition-operator' })
  is_active?: boolean;
}