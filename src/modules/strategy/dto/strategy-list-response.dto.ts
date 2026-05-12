import { ApiProperty } from '@nestjs/swagger';
import { StrategyResponseDto } from './strategy-response.dto';

export class StrategyGroupResponseDto {

  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'KS001' })
  code!: string;

  @ApiProperty({ example: 'Safety surgery' })
  description!: string;

  @ApiProperty({ type: [StrategyResponseDto] })
  kpiStrategies?: StrategyResponseDto[];
}

export class StrategyListResponseDto {
  @ApiProperty({ type: StrategyGroupResponseDto })
  kpistrategyGroup!: StrategyGroupResponseDto;
}