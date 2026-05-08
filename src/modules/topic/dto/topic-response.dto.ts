import { ApiProperty } from '@nestjs/swagger';

export class TopicResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'KPI001' })
  code!: string;

  @ApiProperty({ example: 'อัตราการรายงานค่าวิกฤตใน 30 นาที' })
  description!: string;

  @ApiProperty({ example: 'true' })
  is_active!: boolean;

  @ApiProperty({ example: 'KPI-001' })
  alias_code?: string;
}