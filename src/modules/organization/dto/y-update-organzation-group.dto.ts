/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class XUpdateorganzationGroupDto {

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'KPI organzation' })
  description?: string;

}