import { ApiProperty } from '@nestjs/swagger';
import {OrganzationResponseDto } from './organzation-response.dto';

export class OrganizationGroupResponseDto {

   @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'OG001' })
  code!: string;

  @ApiProperty({ example: 'ผลการดูแลผู้ป่วย' })
  description!: string;

  @ApiProperty({ type: [OrganzationResponseDto] })
  kpiOrganizations?: OrganzationResponseDto[];
}

export class OrganzationListResponseDto {
  @ApiProperty({ type: OrganizationGroupResponseDto })
  kpiOrganizationGroup!: OrganizationGroupResponseDto;
}