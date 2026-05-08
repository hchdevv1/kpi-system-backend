import { ApiProperty } from '@nestjs/swagger';

export class KpiRolesResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: '1' })
  code!: string;

  @ApiProperty({ example: 'Owner' })
  description!: string;

  @ApiProperty({ example: 'true' })
  is_active!: boolean;
}