import { ApiProperty } from '@nestjs/swagger';
import {ServiceUnitResponseDto} from './service-unit-response.dto';


export class ServiceUnitGroupResponseDto {

   @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'SG001' })
  code!: string;

  @ApiProperty({ example: 'PCT' })
  description!: string;

  @ApiProperty({ type: [ServiceUnitResponseDto] })
  serviceunit?: ServiceUnitResponseDto[];
}

export class ServiceUnitListResponseDto {
  @ApiProperty({ type: ServiceUnitGroupResponseDto })
  serviceunitGroup!: ServiceUnitGroupResponseDto;
}