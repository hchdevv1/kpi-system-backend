/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateServiceUnitGroupDto {

  @ApiProperty({ example: 'PCT' })
  @IsNotEmpty()
  description!: string;
  
}