
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, IsNotEmpty, Min } from 'class-validator';

export class QueryKpiDefinitionByIdDto {
  @ApiProperty({
    description: 'KPI Definition ID',
    example: 1106,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id!: number;

@ApiProperty({
  description: 'User code for KPI access validation',
  example: '6110189',
})
@IsString()
@IsNotEmpty()
usercode!: string;
}
