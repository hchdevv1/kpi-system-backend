import { ApiProperty } from '@nestjs/swagger';
import {SimpleResponseDto} from './simple-response.dto';

export class SimpleGroupResponseDto {

   @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'KS001' })
  code!: string;

  @ApiProperty({ example: 'Safety surgery' })
  description!: string;

  @ApiProperty({ type: [SimpleResponseDto] })
  kpisimple?: SimpleResponseDto[];
}

export class SimpleListResponseDto {
  @ApiProperty({ type: SimpleGroupResponseDto })
  kpisimpleGroup!: SimpleGroupResponseDto;
}