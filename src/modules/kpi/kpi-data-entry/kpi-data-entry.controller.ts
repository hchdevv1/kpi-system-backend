import { Body, Controller, Post, } from '@nestjs/common';
import { KpiDataEntryService } from './kpi-data-entry.service';
import { ApiOperation, ApiTags, } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import {KpiDataEntryResponseDto} from './dto/create-kpi-data-entry-response.dto';
import {CreateKpiDataEntryDto} from './dto/create-kpi-data-entry.dto';
@Controller('kpi-data-entry')
export class KpiDataEntryController {
  constructor(private readonly kpiDataEntryService: KpiDataEntryService) { }

  @Post()
  @ApiOperation({
    summary: '[ Create KPI Data Entry ]',
  })
  @ApiBaseResponse(KpiDataEntryResponseDto)
  @ResponseMessage('Create KPI Data Entry success')
  async create(
    @Body() dto: CreateKpiDataEntryDto,
  ): Promise<KpiDataEntryResponseDto> {
    return this.kpiDataEntryService.create(dto);
  }

}
