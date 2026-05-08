/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Controller, Get, Post, ParseIntPipe, Body, Patch, Param } from '@nestjs/common';
import { StrategyService } from './strategy.service';

import { ApiParam, ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import {XCreateStrategyGroupDto} from './dto/y-create-strategy-group.dto';
import {XStrategyGroupResponseDto} from './dto/y-strategy-group-response.dto';
import {XUpdateStrategyGroupDto }from './dto/y-update-strategy-group.dto';

import { XtrategyListResponseDto} from './dto/y-strategy-list-response.dto';
import { XCreateStrategyDto } from './dto/y-create-strategy.dto';
import { XUpdateStrtegyDto} from './dto/y-update-strategy.dto';
@Controller('kpi-Strategy')
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) { }


   @Post('/group')
    @ApiOperation({ summary: '[ Create kpi strategy group  ]' })
    @ApiBaseResponse(XStrategyGroupResponseDto)
    @ResponseMessage('Create kpi strategy group success')
    async createSimpleGroup(
      @Body() dto: XCreateStrategyGroupDto,
    ): Promise<XStrategyGroupResponseDto> {
  
      return await this.strategyService.createStrategyGroup(dto);
    }

  @Get('/group')
  @ApiOperation({ summary: '[ Get all kpi strategy group ]' })
  @ApiBaseResponse(XStrategyGroupResponseDto, { isArray: true })
  @ResponseMessage('Get all kpi strategy group success')
  async findAllSimpleGroup(): Promise<XStrategyGroupResponseDto[]> {
    return await this.strategyService.findAllStrategyGroup();
  }

  @Patch('/group/:id')
  @ApiOperation({ summary: '[ Update kpi strategy group ]' })
  @ApiBaseResponse(XStrategyGroupResponseDto)
  @ResponseMessage('Update kpi strategy group success')
  async updateSimpleGroup(@Param('id') xid: number
    , @Body() dto: XUpdateStrategyGroupDto): Promise<XStrategyGroupResponseDto> {

    return await this.strategyService.updateStrategyGroup(xid, dto)
  }


   @Post('details')
    @ApiOperation({ summary: '[ Create kpi strategy detail ]' })
    @ApiBaseResponse(XtrategyListResponseDto)
    @ResponseMessage('Create kpi strategy detail success')
    async createServiceUnit(
      @Body() dto: XCreateStrategyDto,
    ): Promise<XtrategyListResponseDto> {
  
      return await this.strategyService.createStrategy(dto);
    }
  
    
  @Get('details/:groupId')
  @ApiOperation({ summary: '[ Get kpi strategy detail by group id ]' })
  @ApiParam({
    name: 'groupId',
    type: Number,
    example: 1,
  })
  @ApiBaseResponse(XtrategyListResponseDto)
  @ApiNotFoundResponse({ description: '[ kpi strategy detail group not found ]' })
  @ResponseMessage('Get kip strategy detail by group success')
  async getByGroupId(
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    return await this.strategyService.getStrategyGroupId(groupId);
  }

    @Patch('/details/:id')
    @ApiOperation({ summary: '[ Update kpi strategy detail ]' })
    @ApiBaseResponse(XtrategyListResponseDto)
    @ResponseMessage('Update kpi strategy detail success')
    async updateStrategy(@Param('id') xid: number
      , @Body() dto: XUpdateStrtegyDto): Promise<XtrategyListResponseDto> {
  
      return await this.strategyService.updateStrategy(xid, dto)
    }


}





