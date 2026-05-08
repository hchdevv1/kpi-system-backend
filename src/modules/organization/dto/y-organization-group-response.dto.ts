/* eslint-disable @typescript-eslint/no-unsafe-call */

import { ApiProperty } from '@nestjs/swagger';

export class XOrganizationGroupResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'OGG001' })
  code!: string;

  @ApiProperty({ example: 'Main' })
  description!: string;

}