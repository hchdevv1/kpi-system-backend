/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class XUpdateOrganizationDto {

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'Updated  Organization detail description' })
  description?: string;


  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ example: true, description: 'Flag to enable or disable this Organization detail' })
  is_active?: boolean;
}