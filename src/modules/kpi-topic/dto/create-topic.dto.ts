/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty ,IsOptional,IsString} from 'class-validator';

export class CreateTopicDto {

  @ApiProperty({ example: 'National Average (ระดับประเทศ)' })
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty({ example: 'KPI-001' })
   @IsOptional()
   @IsString()
  alias_code?: string | null;
}