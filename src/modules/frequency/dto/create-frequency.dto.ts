/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFrequencyDto {

  @ApiProperty({ example: 'Monthly (3 month)' })
  @IsNotEmpty()
  description!: string;
  
  @ApiProperty({ example: '3' })
  @IsNotEmpty()
  interval_value!: number
}