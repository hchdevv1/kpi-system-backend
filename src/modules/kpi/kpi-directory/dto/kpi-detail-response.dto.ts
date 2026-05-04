
import { ApiProperty } from '@nestjs/swagger';

class IdDescriptionDto {
  @ApiProperty() id!: number;
  @ApiProperty() description!: string;
}

class IdCodeDescriptionDto {
  @ApiProperty() id!: number;
  @ApiProperty() code!: string;
  @ApiProperty() description!: string;
}

class UserRoleDto {
  @ApiProperty() userRefId!: number;
  @ApiProperty() userName!: string;

  @ApiProperty() roleRefId!: number;
  @ApiProperty() roleName!: string;
}

export class KpiDetailItemDto {
  @ApiProperty() id!: number;
@ApiProperty() is_active!: boolean;
  @ApiProperty({ type: IdDescriptionDto })
  topic!: IdDescriptionDto;

  @ApiProperty() year!: number;
  @ApiProperty() kpiStartDate?: string;
  @ApiProperty() targetValue?: number;
  @ApiProperty() previousYearValue?: number;

  @ApiProperty() numerator?: string;
  @ApiProperty() denominator?: string;
  @ApiProperty() multiplier?: number;

  @ApiProperty({ required: false }) strategy?: IdDescriptionDto;
  @ApiProperty({ required: false }) organization?: IdDescriptionDto;

  @ApiProperty({ type: [IdCodeDescriptionDto] })
  simpleMappings!: IdCodeDescriptionDto[];

  @ApiProperty({ type: [IdCodeDescriptionDto] })
  serviceUnits!: IdCodeDescriptionDto[];

  @ApiProperty({ required: false }) unit?: IdDescriptionDto;
  @ApiProperty({ required: false }) frequency?: IdDescriptionDto;
  @ApiProperty({ required: false }) conditionOperator?: IdDescriptionDto;
  @ApiProperty({ required: false }) benchmark?: IdDescriptionDto;

  @ApiProperty({ type: [UserRoleDto] })
 userRoles?: {
  userRefId: number;
  userName: string;
  roleRefId: number;
  roleName: string;
}[];
}