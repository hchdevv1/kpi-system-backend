import { ApiProperty } from '@nestjs/swagger';

export class SystemRolesResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: '1' })
  code!: string;

  @ApiProperty({ example: 'admin' })
  description!: string;

  @ApiProperty({ example: 'true' })
  is_active!: boolean;
}