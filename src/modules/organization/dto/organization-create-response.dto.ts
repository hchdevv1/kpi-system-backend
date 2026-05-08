import { ApiProperty } from '@nestjs/swagger';
import { OrganizationGroupDto } from './organization-response.dto';

export class CreateOrganizationResponseDto {
  @ApiProperty({ type: OrganizationGroupDto })
  OrganizationGroup!: OrganizationGroupDto;

  @ApiProperty()
  id!: number;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  mst_organization_group_id!: number;

  @ApiProperty()
  is_active!: boolean;
}

