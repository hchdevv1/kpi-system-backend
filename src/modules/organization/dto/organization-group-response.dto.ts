import { ApiProperty } from '@nestjs/swagger';
import { OrganizationDto} from './organizationDto.dto';



export class OrganizationGroupResponseDto {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  description?: string;

  @ApiProperty({ type: [OrganizationDto] })
  organizations?: OrganizationDto[];
}

export class GetOrganizationGroupResponseDto {
  @ApiProperty({ type: OrganizationGroupResponseDto })
  organizationGroup!: OrganizationGroupResponseDto;
}