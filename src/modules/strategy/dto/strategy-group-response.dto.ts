import { ApiProperty } from '@nestjs/swagger';
import { StrategyDto } from './StrategyDto.dto';


export class StrategyGroupResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  description?: string;

  @ApiProperty({ type: [StrategyDto] })
  strategies?: StrategyDto[];
}

export class GetStrategyByGroupResponseDto {
  @ApiProperty({ type: StrategyGroupResponseDto })
  strategyGroup!: StrategyGroupResponseDto;
}