/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty, } from '@nestjs/swagger';
import { IsNotEmpty, IsInt ,IsOptional} from 'class-validator';

export class CreateUserSystemDto {


  @ApiProperty({ example: '611XXXX' })
  @IsNotEmpty()
  usercode!: string

  @ApiProperty({ example: 'Mr XX XXXX' })
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  usersystem_role_id!: number;

  @ApiProperty({ example: true })
    @IsOptional()
  is_active?: boolean;


}