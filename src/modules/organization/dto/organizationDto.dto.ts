import { ApiProperty } from '@nestjs/swagger';

export class OrganizationDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  is_active?: boolean;
}