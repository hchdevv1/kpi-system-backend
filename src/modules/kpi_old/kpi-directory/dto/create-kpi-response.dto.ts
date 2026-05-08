import { BaseResponseDto } from 'src/common/dto/base-response.dto';
import {KpiResponseDto} from './kpi-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateKpiResponseDto extends BaseResponseDto<KpiResponseDto> {
  @ApiProperty({ type: KpiResponseDto })
  data!: KpiResponseDto;
}