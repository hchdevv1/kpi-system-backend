/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMeasureCategoryDto {
 
  @ApiProperty({ example: 'Strategy' })
  @IsNotEmpty()
  description!: string;
}