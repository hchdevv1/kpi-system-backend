/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
export class XOrganzationResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'OG' })
  code!: string;

  @ApiProperty({ example: 'Main' })
  description!: string;

  @ApiProperty({ example: true })
  is_active?: boolean;
}