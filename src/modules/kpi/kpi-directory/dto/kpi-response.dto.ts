import { ApiProperty } from '@nestjs/swagger';

class RefDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  description!: string;
}

export class KpiResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  year!: number;

  @ApiProperty()
  kpiStartDate?: string;

  @ApiProperty({ type: RefDto, nullable: true })
  strategy?: RefDto;

  @ApiProperty({ type: RefDto, nullable: true })
  organization?: RefDto;

  @ApiProperty({ type: RefDto })
  frequency!: RefDto;

  @ApiProperty({ type: RefDto })
  unit!: RefDto;

  @ApiProperty({ type: RefDto, nullable: true })
  conditionOperator?: RefDto;

  @ApiProperty({ type: RefDto, nullable: true })
  benchmark?: RefDto;

  @ApiProperty({ type: [RefDto] })
  serviceUnits!: RefDto[];

  @ApiProperty({ type: [RefDto] })
  simpleMappings!: RefDto[];
}