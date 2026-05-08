import { ApiProperty } from '@nestjs/swagger';

export class FrequencyResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'F001' })
  code!: string;

  @ApiProperty({ example: 'Monthly (1 month)' })
  description!: string;

  @ApiProperty({ example: '3' })
  interval_value!: number

  @ApiProperty({ example: 'true' })
  is_active!: boolean;
}