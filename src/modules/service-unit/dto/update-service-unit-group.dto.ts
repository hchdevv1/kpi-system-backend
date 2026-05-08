/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateServiceUnitGroupDto {

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'PCT' })
  description?: string;

}