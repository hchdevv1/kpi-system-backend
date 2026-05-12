/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Controller, Get, Post, ParseIntPipe, Body, Patch, Param } from '@nestjs/common';
import { StrategyService } from './strategy.service';

import { ApiParam, ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import {CreateStrategyGroupDto} from './dto/create-strategy-group.dto';
import {StrategyGroupResponseDto} from './dto/strategy-group-response.dto';
import {UpdateStrategyGroupDto }from './dto/update-strategy-group.dto';

import { StrategyListResponseDto} from './dto/strategy-list-response.dto';
import { CreateStrategyDto } from './dto/create-strategy.dto';
import { UpdateStrtegyDto} from './dto/update-strategy.dto';
@Controller('kpi-Strategy')
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) { }


   @Post('/group')
    @ApiOperation({ summary: '[ Create kpi strategy group  ]' })
    @ApiBaseResponse(StrategyGroupResponseDto)
    @ResponseMessage('Create kpi strategy group success')
    async createSimpleGroup(
      @Body() dto: CreateStrategyGroupDto,
    ): Promise<StrategyGroupResponseDto> {
  
      return await this.strategyService.createStrategyGroup(dto);
    }

  @Get('/group')
  @ApiOperation({ summary: '[ Get all kpi strategy group ]' })
  @ApiBaseResponse(StrategyGroupResponseDto, { isArray: true })
  @ResponseMessage('Get all kpi strategy group success')
  async findAllStrategyGroup(): Promise<StrategyGroupResponseDto[]> {
    return await this.strategyService.findAllStrategyGroup();
  }

  @Patch('/group/:id')
  @ApiOperation({ summary: '[ Update kpi strategy group ]' })
  @ApiBaseResponse(StrategyGroupResponseDto)
  @ResponseMessage('Update kpi strategy group success')
  async updateStrategyGroup(@Param('id') xid: number
    , @Body() dto: UpdateStrategyGroupDto): Promise<StrategyGroupResponseDto> {

    return await this.strategyService.updateStrategyGroup(xid, dto)
  }


   @Post('details')
    @ApiOperation({ summary: '[ Create kpi strategy detail ]' })
    @ApiBaseResponse(StrategyListResponseDto)
    @ResponseMessage('Create kpi strategy detail success')
    async createStrategy(
      @Body() dto: CreateStrategyDto,
    ): Promise<StrategyListResponseDto> {
  
      return await this.strategyService.createStrategy(dto);
    }
  
    
  @Get('details/:groupId')
  @ApiOperation({ summary: '[ Get kpi strategy detail by group id ]' })
  @ApiParam({
    name: 'groupId',
    type: Number,
    example: 1,
  })
  @ApiBaseResponse(StrategyListResponseDto)
  @ApiNotFoundResponse({ description: '[ kpi strategy detail group not found ]' })
  @ResponseMessage('Get kip strategy detail by group success')
  async getStrategyGroupId(
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    return await this.strategyService.getStrategyGroupId(groupId);
  }

    @Patch('/details/:id')
    @ApiOperation({ summary: '[ Update kpi strategy detail ]' })
    @ApiBaseResponse(StrategyListResponseDto)
    @ResponseMessage('Update kpi strategy detail success')
    async updateStrategy(@Param('id') xid: number
      , @Body() dto: UpdateStrtegyDto): Promise<StrategyListResponseDto> {
  
      return await this.strategyService.updateStrategy(xid, dto)
    }


}





