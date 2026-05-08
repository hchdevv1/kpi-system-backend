import { IsString, Length, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
 
  @ApiProperty({ example: 'ผลการดูแลผู้ป่วย' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Length(1, 255)
  description!: string;

  @ApiProperty({ example: 1 })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsInt()
  organization_group_id!: number;
}