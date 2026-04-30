// common/dto/base-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T = any> {
  @ApiProperty({ example: true })
  success?: boolean;

  @ApiProperty({ example: 'Request success' })
  message?: string;

  data?: T;
}