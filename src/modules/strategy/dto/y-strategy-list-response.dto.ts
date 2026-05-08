import { ApiProperty } from '@nestjs/swagger';
import {XStrategyResponseDto } from './y-strategy-response.dto';

export class XStrategyGroupResponseDto {

   @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'KS001' })
  code!: string;

  @ApiProperty({ example: 'Safety surgery' })
  description!: string;

  @ApiProperty({ type: [XStrategyResponseDto] })
  kpiStrategies?: XStrategyResponseDto[];
}

export class XtrategyListResponseDto {
  @ApiProperty({ type: XStrategyGroupResponseDto })
  kpistrategyGroup!: XStrategyGroupResponseDto;
}