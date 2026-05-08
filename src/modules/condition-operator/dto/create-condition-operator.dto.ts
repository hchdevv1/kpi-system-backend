/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateConditionOperatorDto {

  @ApiProperty({ example: 'มากกว่า' })
  @IsNotEmpty()
  description!: string;
  @ApiProperty({ example: '>' })
  @IsOptional()
  symbol?: string | null;
}