/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateSimpleGroupDto {

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'Patient' })
  description?: string;

}