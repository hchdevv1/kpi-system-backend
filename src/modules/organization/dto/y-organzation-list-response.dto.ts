import { ApiProperty } from '@nestjs/swagger';
import {XOrganzationResponseDto } from './y-organzation-response.dto';

export class XOrganizationGroupResponseDto {

   @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'OG001' })
  code!: string;

  @ApiProperty({ example: 'ผลการดูแลผู้ป่วย' })
  description!: string;

  @ApiProperty({ type: [XOrganzationResponseDto] })
  kpiStrategies?: XOrganzationResponseDto[];
}

export class XOrganzationListResponseDto {
  @ApiProperty({ type: XOrganizationGroupResponseDto })
  kpistrategyGroup!: XOrganizationGroupResponseDto;
}