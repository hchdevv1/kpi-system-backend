import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from './topic-response-pagination.dto ';
import { TopicResponseDto } from './topic-response.dto';

export class TopicListResponseDto {
  @ApiProperty({ type: [TopicResponseDto] })
  kpis!: TopicResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta!: PaginationMetaDto;

}