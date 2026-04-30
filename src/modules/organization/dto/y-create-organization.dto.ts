/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, Length, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class XCreateOrganizationDto {
 
  @ApiProperty({ example: 'ผลการดูแลผู้ป่วย' })
  @IsString()
  @Length(1, 255)
  description!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  mst_organization_group_id!: number;
}