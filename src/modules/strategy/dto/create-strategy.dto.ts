import { IsString, Length, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStrategyDto {
 
  @ApiProperty({ example: 'พัฒนาศักยภาพการดูแลรักษา เพิ่มคุณภาพและสร้างความปลอดภัยระดับมาตรฐานสากล' })
  @IsString()
  @Length(1, 255)
  description!: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  mst_strategy_group_id!: number;
}