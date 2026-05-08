/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, Length, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSimpleDto {
 
  @ApiProperty({ example: 'Safety surgery' })
  @IsString()
  @Length(1, 255)
  description!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  simple_group_id!: number;
}