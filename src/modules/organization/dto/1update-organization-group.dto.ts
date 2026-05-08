/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class XUpdateOrganizationGroupDto {
  @ApiPropertyOptional({ example: 'S001' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  code?: string;

  @ApiPropertyOptional({ example: 'Strategy Group Updated' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}