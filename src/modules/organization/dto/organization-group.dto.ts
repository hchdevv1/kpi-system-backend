import { ApiProperty } from '@nestjs/swagger';

export class OrganizationGroupDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  description?: string;
}