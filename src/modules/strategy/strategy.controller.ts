import { Controller, Get, ParseIntPipe ,Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StrategyService } from './strategy.service';

import { CreateStrategyDto } from './dto/create-strategy.dto';
import { CreateStrategyGroupDto } from './dto/create-strategy-group.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetStrategyByGroupResponseDto} from './dto/strategy-group-response.dto';

@ApiTags('Strategy')
@Controller('strategy')
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) {}

  // 🔹 create group
  @Post('group')
  @ApiOperation({ summary: 'Create strategy group' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  async createGroup(@Body() dto: CreateStrategyGroupDto) {
    const result = await this.strategyService.createStrategyGroup(dto.code,dto.description,);

    return {
      success: true,
      message: 'Create strategy group success',
      data: result,
    };
  }
    // 🔹 create strategy
  @Post()
  @ApiOperation({ summary: 'Create strategy' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  async create(@Body() dto: CreateStrategyDto) {
    const result = await this.strategyService.createStrategy(
  
      dto.description,
      dto.mst_strategy_group_id,
    );

    return {
      success: true,
      message: 'Create strategy success',
      data: result,
    };
  }

@Get('group')
@ApiOperation({ summary: 'Get strategy groups' })
async getGroups() {
  const result = await this.strategyService.getStrategyGroups();

  return {
    success: true,
    message: 'Get strategy groups success',
    data: result,
  };
}
@Get()
@ApiOperation({ summary: 'Get strategies' })
async getAll() {
  const result = await this.strategyService.getStrategies();

  return {
    success: true,
    message: 'Get strategies success',
    data: result,
  };
}

@Get('group/:groupId')
@ApiOperation({ summary: 'Get strategies by group id' })
@ApiResponse({ type: GetStrategyByGroupResponseDto })
async getByGroupId(
  @Param('groupId', ParseIntPipe) groupId: number,
) {
  const result = await this.strategyService.getStrategiesByGroupId(groupId);

  return {
    success: true,
    message: 'Get strategies by group success',
    data: result,
  };
}
}
