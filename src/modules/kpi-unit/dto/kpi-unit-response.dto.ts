/* eslint-disable @typescript-eslint/no-unsafe-call */

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class KPIUnitResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'U001' })
  code!: string;

  @ApiProperty({ example: 'อัตราต่อ 100' })
  description!: string;

  @IsOptional()
  @ApiProperty({ example: '' })
  symbol?: string | null;

  @IsOptional()
  @ApiProperty({ example: ' 100 ' })
  scale_factor?: string | null;

  @ApiProperty({ example: 'true' })
  is_active!: boolean;

  @ApiProperty({ example: 'false' })
  is_percent!: boolean;
  
}