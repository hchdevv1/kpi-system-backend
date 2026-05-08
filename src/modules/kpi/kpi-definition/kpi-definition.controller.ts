import { Controller, Get,Query, Param, Post, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { KpiDefinitionService } from './kpi-definition.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';
import { PaginatedResponseDto} from 'src/common/dto/paginated-response.dto';
import { CreateKpiDefinitionDto } from './dto/create-kpi-definition.dto';
import { CreateKpiDefinitionResponseDto } from './dto/create-kpi-definition-response.dto';
import {QueryKpiDefinitionDto} from './dto/query-kpi-definition.dto';

@ApiTags('KPI Definition')
@Controller('kpi-definition')
export class KpiDefinitionController {
  constructor(private readonly kpiDefinitionService: KpiDefinitionService) { }

 @Get()
@ApiOperation({ summary: '[ Get all KPI Definition ]' })
@ApiBaseResponse(PaginatedResponseDto)
@ResponseMessage('Get all KPI success')
async findAll(
  @Query() query: QueryKpiDefinitionDto,
): Promise<PaginatedResponseDto<CreateKpiDefinitionResponseDto>> {
  return this.kpiDefinitionService.findAll(query);
}

  @Get(':id')
  @ApiOperation({ summary: '[ Get KPI By Id ]' })
  @ApiBaseResponse(CreateKpiDefinitionResponseDto)
  @ResponseMessage('Get KPI by id success')
  async findById(
    @Param('id') id: number,
  ): Promise<CreateKpiDefinitionResponseDto> {
    return this.kpiDefinitionService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: '[ Create KPI ]' })
  @ApiBaseResponse(CreateKpiDefinitionResponseDto)
  @ResponseMessage('Create KPI success')
  async create(
    @Body() dto: CreateKpiDefinitionDto,
  ): Promise<CreateKpiDefinitionResponseDto> {
    return this.kpiDefinitionService.create(dto);
  }
  @Patch(':id')

  @ApiOperation({ summary: '[ Patch KPI Definition ]' })
  @ApiBaseResponse(CreateKpiDefinitionResponseDto)
  @ResponseMessage('Patch KPI success')
  async patch(
    @Param('id') id: number,
    @Body() dto: CreateKpiDefinitionDto,
  ): Promise<CreateKpiDefinitionResponseDto> {
    return this.kpiDefinitionService.patch(id, dto);
  }
}
