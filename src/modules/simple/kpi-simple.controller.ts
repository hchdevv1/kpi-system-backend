import { Controller, Get, Post, ParseIntPipe, Body, Patch, Param } from '@nestjs/common';
import { KpiSimpleService } from './kpi-simple.service';

import { ApiParam, ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import { SimpleGroupResponseDto } from './dto/simple-group-response.dto';
import { CreateSimpleGroupDto } from './dto/create-simple-group.dto';
import { UpdateSimpleGroupDto } from './dto/update-simple-group.dto';

import { SimpleListResponseDto } from './dto/simple-list-response.dto';
import { CreateSimpleDto } from './dto/create-simple.dto'
import { UpdateSimpleDto } from './dto/update-simple.dto';
@Controller('kpi-simple')
export class KpiSimpleController {
  constructor(private readonly kpiSimpleService: KpiSimpleService) { }

  @Post('/group')
  @ApiOperation({ summary: '[ Create kpi simple group  ]' })
  @ApiBaseResponse(SimpleGroupResponseDto)
  @ResponseMessage('Create kpi simple group success')
  async createSimpleGroup(
    @Body() dto: CreateSimpleGroupDto,
  ): Promise<SimpleGroupResponseDto> {

    return await this.kpiSimpleService.createSimpleGroup(dto);
  }

  @Get('/group')
  @ApiOperation({ summary: '[ Get all kpi simple group ]' })
  @ApiBaseResponse(SimpleGroupResponseDto, { isArray: true })
  @ResponseMessage('Get all kpi simple group success')
  async findAllSimpleGroup(): Promise<SimpleGroupResponseDto[]> {
    return await this.kpiSimpleService.findAllSimpleGroup();
  }

  @Patch('/group/:id')
  @ApiOperation({ summary: '[ Update kpi simple group ]' })
  @ApiBaseResponse(SimpleGroupResponseDto)
  @ResponseMessage('Update kpi simple group success')
  async updateSimpleGroup(@Param('id') xid: number
    , @Body() dto: UpdateSimpleGroupDto): Promise<SimpleGroupResponseDto> {

    return await this.kpiSimpleService.updateSimpleGroup(xid, dto)
  }

  @Post('details')
  @ApiOperation({ summary: '[ Create kpi simple ]' })
  @ApiBaseResponse(SimpleListResponseDto)
  @ResponseMessage('Create kpi simple success')
  async createServiceUnit(
    @Body() dto: CreateSimpleDto,
  ): Promise<SimpleListResponseDto> {

    return await this.kpiSimpleService.createSimple(dto);
  }

  @Get('details/:groupId')
  @ApiOperation({ summary: '[ Get kpi simple by group id ]' })
  @ApiParam({
    name: 'groupId',
    type: Number,
    example: 1,
  })
  @ApiBaseResponse(SimpleListResponseDto)
  @ApiNotFoundResponse({ description: '[ kpi simple group not found ]' })
  @ResponseMessage('Get kip simple by group success')
  async getByGroupId(
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    return await this.kpiSimpleService.getSimpleGroupId(groupId);
  }
  
  @Patch('/details/:id')
  @ApiOperation({ summary: '[ Update kpi simple ]' })
  @ApiBaseResponse(SimpleListResponseDto)
  @ResponseMessage('Update kpi simple success')
  async updateServiceUnit(@Param('id') xid: number
    , @Body() dto: UpdateSimpleDto): Promise<SimpleListResponseDto> {

    return await this.kpiSimpleService.updateSimple(xid, dto)
  }
}
