import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { KpiUnitService } from './kpi-unit.service';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import { KPIUnitResponseDto } from './dto/kpi-unit-response.dto';
import { CreateKPIUnitDto } from './dto/create-kpi-unit.dto';
import { UpdateKPIUnitDto } from './dto/update-kpi-unit.dto';
@Controller('kpi-unit')
export class KpiUnitController {
  constructor(private readonly kpiUnitService: KpiUnitService) { }

   @Post()
    @ApiOperation({ summary: '[ Create kpi unit ]' })
    @ApiBaseResponse(KPIUnitResponseDto)
    @ResponseMessage('Create kpi unit success')
    async create(
      @Body() dto: CreateKPIUnitDto,
    ): Promise<KPIUnitResponseDto> {
  
      return await this.kpiUnitService.createKPIUnit(dto);
    }

  @Get()
  @ApiOperation({ summary: '[ Get all kpi unit ]' })
  @ApiBaseResponse(KPIUnitResponseDto, { isArray: true })
  @ResponseMessage('Get all kpi unit success')
  async findAll(): Promise<KPIUnitResponseDto[]> {
    return await this.kpiUnitService.findAll();
  }
   @Patch(':id')
    @ApiOperation({ summary: '[ Update kpi unit ]' })
    @ApiBaseResponse(KPIUnitResponseDto)
    @ResponseMessage('Update kpi unit success')
    async update(@Param('id') xid: number
      , @Body() dto: UpdateKPIUnitDto): Promise<KPIUnitResponseDto> {
  
      return await this.kpiUnitService.updateKPIUnit(xid, dto)
    }
}
