import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserAuditDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  UserCode!: string;

  @ApiProperty()
  UserName!: string;
}

export class KpiDataEntryResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  kpiDefinitionId!: number;

  @ApiProperty()
  kpiDefYear!: number;

  @ApiProperty()
  kpiDefMonth!: number;

  @ApiProperty()
  numeratorValue!: number;

  @ApiPropertyOptional()
  denominatorValue?: number;

  // =========================
  // Audit User
  // =========================

  @ApiPropertyOptional({ type: UserAuditDto })
  createdBy?: UserAuditDto;

  @ApiPropertyOptional({ type: UserAuditDto })
  updatedBy?: UserAuditDto;

  // =========================
  // Audit Date
  // =========================

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}