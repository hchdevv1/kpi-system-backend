import { Controller, Query, Param, ParseIntPipe, Get, Post, Body,Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import { KpiDirectoryService } from './kpi-directory.service';
import { CreateKpiDto } from './dto/create-kpi.dto';
import { KpiResponseDto } from './dto/kpi-response.dto';
import { KpiListResponseDto } from './dto/kpi-list-response.dto';
import { QueryKpiDto } from './dto/query-kpi.dto';
import { KpiDetailItemDto } from './dto/kpi-detail-response.dto';
import { UpdateKpiDto} from './dto/update-kpi.dto';
@ApiTags('KPI Directory')
@Controller('kpi')
export class KpiDirectoryController {
  constructor(
    private readonly kpiDirectoryService: KpiDirectoryService,
  ) { }



  @Post()
  @ApiOperation({ summary: '[ Create KPI ]' })
  @ApiBaseResponse(KpiResponseDto)
  @ResponseMessage('Create KPI success')
  async create(
    @Body() dto: CreateKpiDto,
  ): Promise<KpiResponseDto> {
    return this.kpiDirectoryService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: '[ Get KPI List ]' })
  @ApiBaseResponse(KpiListResponseDto)
  @ResponseMessage('Get KPI list success')
  async findAll(
    @Query() query: QueryKpiDto,
  ): Promise<KpiListResponseDto> {
    return this.kpiDirectoryService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: '[ Get KPI detail ]' })
  @ApiBaseResponse(KpiDetailItemDto)
  @ResponseMessage('Get KPI detail success')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<KpiDetailItemDto> {
    return this.kpiDirectoryService.findOne(id);
  }
@Patch(':id')
@ApiOperation({ summary: '[ Update KPI ]' })
@ApiBaseResponse(KpiDetailItemDto)
@ResponseMessage('Update KPI success')
async update(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: UpdateKpiDto,
): Promise<KpiDetailItemDto> {
  return await this.kpiDirectoryService.update(id, dto);
}
}
