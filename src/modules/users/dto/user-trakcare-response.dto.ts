import { ApiProperty } from '@nestjs/swagger';

export class UserTrakcareDto {
  @ApiProperty({ example: 1 })
  RowID!: number;

  @ApiProperty({ example: '611XXXX' })
  UserCode!: string;

  @ApiProperty({ example: 'Mr XX XXXX' })
  UserName!: string;
}

export class UserTrakcareResponseDto {
  @ApiProperty({ type: UserTrakcareDto })
  UserInfo!: UserTrakcareDto[];
}