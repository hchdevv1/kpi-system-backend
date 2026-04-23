import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStrategyGroupDto {
  @ApiProperty({ example: 'S001' })
  @IsString()
  @Length(1, 50)
  code!: string;

  @ApiProperty({ example: 'Strategy Group' })
  @IsString()
  @Length(1, 255)
  description!: string;
}