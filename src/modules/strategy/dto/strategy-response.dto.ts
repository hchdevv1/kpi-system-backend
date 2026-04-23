import { ApiProperty } from '@nestjs/swagger';

export class StrategyGroupMiniDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  description!: string;
}