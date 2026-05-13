import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserRoleCreateDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  userId!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  roleId!: number;
}

export class CreateKpiDefinitionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  topicRefId!: number;

  @ApiProperty({ example: 2026 })
  @IsInt()
  kpiYear!: number;

  @ApiPropertyOptional({ example: '2026-01-01' })
  @IsOptional()
  @IsDateString()
  kpiStartDate?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  measureRefId?: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  frequencyRefId?: number;

  @ApiProperty({ example: 3 })
  @IsOptional()
  @IsInt()
  unitRefId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  conditionOperatorRefId?: number;

  // formula
  @ApiPropertyOptional({ example: 'จำนวนผู้ติดเชื้อ' })
  @IsOptional()
  @IsString()
  numerator?: string;

  @ApiPropertyOptional({ example: 'จำนวนผู้ป่วยทั้งหมด' })
  @IsOptional()
  @IsString()
  denominator?: string;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsNumber()
  multiplier?: number;

  // values
  @ApiPropertyOptional({ example: 90 })
  @IsOptional()
  @IsNumber()
  targetValue?: number;

  @ApiPropertyOptional({ example: 88.2 })
  @IsOptional()
  @IsNumber()
  previousYearValue?: number;

  // benchmark
  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  benchmarkRefId?: number;

  @ApiPropertyOptional({ example: 95.5 })
  @IsOptional()
  @IsNumber()
  benchmarkTargetValue?: number;

  // mappings
  @ApiPropertyOptional({ type: [Number], example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  strategyIds?: number[];

  @ApiPropertyOptional({ type: [Number], example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  organizationIds?: number[];

  @ApiPropertyOptional({ type: [Number], example: [1] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  serviceUnitIds?: number[];

  @ApiPropertyOptional({ type: [Number], example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  simpleIds?: number[];

  @ApiPropertyOptional({ type: [UserRoleCreateDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserRoleCreateDto)
  userRoles?: UserRoleCreateDto[];

  @ApiProperty({ example: 'true' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}