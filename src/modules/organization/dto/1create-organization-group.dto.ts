/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class XCreateOrganizationGroupDto {
  @ApiProperty({ example: 'XXS001' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  code!: string;

  @ApiProperty({ example: 'XXStrategy Group' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description!: string;
}