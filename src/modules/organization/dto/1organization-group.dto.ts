import { ApiProperty } from '@nestjs/swagger';

export class XOrganizationGroupDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'OG001' })
  code!: string;

  @ApiProperty({ example: 'Main' })
  description!: string;
}