/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBenchmarkDto {
 
  @ApiProperty({ example: 'National Average (ระดับประเทศ)' })
  @IsNotEmpty()
  description!: string;
}