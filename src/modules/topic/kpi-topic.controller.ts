import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { KpiTopicService } from './kpi-topic.service';


import { ApiParam, ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import { TopicResponseDto } from './dto/topic-response.dto';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { PagingQueryDto } from './dto/pagination-topic.dto';
import { PagingWithSearchQueryDto } from './dto/pagination-withsearch-topic.dto';
import { TopicListResponseDto } from './dto/topiclist-response-pagination.dto';
@Controller('kpi-topic')
export class KpiTopicController {
  constructor(private readonly kpiTopicService: KpiTopicService) { }

  @Post()
  @ApiOperation({ summary: '[ Create kpi topic ]' })
  @ApiBaseResponse(TopicResponseDto)
  @ResponseMessage('Create kpi topic success')
  async create(
    @Body() dto: CreateTopicDto,
  ): Promise<TopicResponseDto> {

    return await this.kpiTopicService.createkpiTopic(dto);
  }

  @Get()
  @ApiOperation({ summary: '[ Get all kpi topic ]' })
  @ApiBaseResponse(TopicListResponseDto)
  @ResponseMessage('Get all kpi topic success')
  async findAll(@Query() query: PagingQueryDto): Promise<TopicListResponseDto> {
    return await this.kpiTopicService.findAll(query);
  }

  @Get('/WithSearch')
  @ApiOperation({ summary: '[ Get all kpi topic With search ]' })
  @ApiBaseResponse(TopicListResponseDto)
  @ResponseMessage('Get all kpi topic success')
  async findAllWithSearch(@Query() query: PagingWithSearchQueryDto): Promise<TopicListResponseDto> {
    return await this.kpiTopicService.findAllWithSearch(query);
  }

  @Patch(':id')
  @ApiOperation({ summary: '[ Update kpi topic ]' })
  @ApiBaseResponse(TopicResponseDto)
  @ResponseMessage('Update kpi topic success')
  async update(@Param('id') xid: number
    , @Body() dto: UpdateTopicDto): Promise<TopicResponseDto> {

    return await this.kpiTopicService.updatekpiTopic(xid, dto)
  }
}