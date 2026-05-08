/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, Length, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceUnitDto {
 
  @ApiProperty({ example: 'Med' })
  @IsString()
  @Length(1, 255)
  description!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  service_unit_group_id!: number;
}