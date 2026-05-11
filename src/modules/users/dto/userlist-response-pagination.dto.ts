import { ApiProperty } from '@nestjs/swagger';


import { UserSystemResponseDto } from './create-user-system-response.dto';
import {UserResponseDto} from './user-system-response';
import { PaginationMetaDto } from './user-response-pagination.dto ';
export class UserListResponseDto {
  @ApiProperty({ type: [UserResponseDto] })
  UserInfo?: UserResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta!: PaginationMetaDto;

}