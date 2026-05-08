/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class XUpdateStrategyGroupDto {

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'Strategy' })
  description?: string;

}