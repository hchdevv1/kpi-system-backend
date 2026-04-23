import { ApiProperty } from '@nestjs/swagger';
import { StrategyGroupMiniDto } from './strategy-response.dto';

export class CreateStrategyResponseDto {
  @ApiProperty({ type: StrategyGroupMiniDto })
  strategyGroup!: StrategyGroupMiniDto;

  @ApiProperty()
  id!: number;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  mst_strategy_group_id!: number;

  @ApiProperty()
  is_active!: boolean;
}