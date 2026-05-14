import { Controller, Get, Query, } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { KpiResultService } from './kpi-result.service';

import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

import { QueryKpiResultDto } from './dto/query-kpi-result.dto';
import { KpiResultListResponseDto } from './dto/kpi-result-list-response.dto';
@ApiTags('KPI Result')
@Controller('kpi-result')
export class KpiResultController {
  constructor(private readonly kpiResultService: KpiResultService) { }

   @Get()
  @ApiBaseResponse(KpiResultListResponseDto, { isArray: true })
  async findAll(@Query() query: QueryKpiResultDto) {
    return this.kpiResultService.findAll(query);
  }

/*
  @Get()
  @ApiOperation({ summary: '[ Get KPI Result List ]' })
  @ApiBaseResponse(PaginatedResponseDto)
  @ResponseMessage('Get KPI Result success')
  async findAll(
    @Query() query: QueryKpiResultDto,
  ): Promise<PaginatedResponseDto<KpiResultListItemDto>> {
    return this.kpiResultService.findAll(query);
  }
*/
}
