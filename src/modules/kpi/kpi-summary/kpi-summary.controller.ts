
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { KpiSummaryService } from './kpi-summary.service';
import { KpiSummaryRequestDto } from './dto/kpi-summary-request.dto';
import { KpiSummaryResponseDto } from './dto/kpi-summary-response.dto';

@ApiTags('KPI Summary')
@Controller('summary')
export class KpiSummaryController {
  constructor(
    private readonly kpiSummaryService: KpiSummaryService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Get KPI summary by tab and year',
  })
  @ApiBody({ type: KpiSummaryRequestDto })
  async findSummary(
    @Body() request: KpiSummaryRequestDto,
  ): Promise<KpiSummaryResponseDto> {
    return this.kpiSummaryService.findSummary(request);
  }
}
