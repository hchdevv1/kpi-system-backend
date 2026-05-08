// common/dto/paginated-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from './pagination-meta.dto';

export class PaginatedResponseDto<T> {
  @ApiProperty({ type: 'array' })
  items?: T[];

  @ApiProperty({ type: PaginationMetaDto })
  meta?: PaginationMetaDto;
}