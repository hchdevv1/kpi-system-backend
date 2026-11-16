import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { KpiResultService } from './kpi-result.service';

import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

import { QueryKpiResultDto } from './dto/query-kpi-result.dto';
import { KpiResultListResponseDto } from './dto/kpi-result-list-response.dto';
import { MonthlyKpiResultRequestDto } from './dto/monthly-kpi-result-request.dto';
import { MonthlyKpiResultResponseDto } from './dto/monthly-kpi-result-response.dto';

@ApiTags('KPI Result')
@Controller('kpi-result')
export class KpiResultController {
  constructor(private readonly kpiResultService: KpiResultService) {}

  @Get()
  @ApiBaseResponse(KpiResultListResponseDto, { isArray: true })
  async findAll(@Query() query: QueryKpiResultDto) {
    console.log(query);
    console.log(typeof query.editKpiUser);
    console.log('------');
    return this.kpiResultService.findAll(query);
  }

  @Post('monthly')
  @ApiOperation({
    summary: 'Get monthly KPI results by KPI definition and year',
  })
  @ApiBaseResponse(MonthlyKpiResultResponseDto)
  async findMonthly(
    @Body() body: MonthlyKpiResultRequestDto,
  ): Promise<MonthlyKpiResultResponseDto> {
    return this.kpiResultService.findMonthly(body);
  }
}
