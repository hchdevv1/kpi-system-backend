import { ApiProperty } from '@nestjs/swagger';

export class BenchmarkResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'B001' })
  code!: string;

  @ApiProperty({ example: 'National Average (ระดับประเทศ)' })
  description!: string;

  @ApiProperty({ example: 'true' })
  is_active!: boolean;
}