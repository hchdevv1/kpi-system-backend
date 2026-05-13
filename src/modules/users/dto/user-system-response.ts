/* eslint-disable @typescript-eslint/no-unsafe-call */

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsInt } from 'class-validator';

export class UserResponseDto {

   @ApiProperty({ example: '1' })
  @IsNotEmpty()
  id!: number

  @ApiProperty({ example: '611XXXX' })
  @IsNotEmpty()
  usercode!: string

  @ApiProperty({ example: 'Mr XX XXXX' })
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  usersystem_role_id!: number;

  @ApiProperty({ example: 'Admin / usesr / viewer' })
  @IsNotEmpty()
  roleDescription?: string;

  @ApiProperty({ example: true })
  @IsOptional()
  is_active?: boolean;


}
export class UserListResponseDto {
  items!: UserResponseDto[];
}