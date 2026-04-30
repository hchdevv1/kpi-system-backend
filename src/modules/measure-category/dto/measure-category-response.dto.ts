import { ApiProperty } from '@nestjs/swagger';

export class MeasureCategoryResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'M001' })
  code!: string;

  @ApiProperty({ example: 'ยุทธศาสตร์' })
  description!: string;

  @ApiProperty({ example: 'true' })
  is_active!: boolean;
}