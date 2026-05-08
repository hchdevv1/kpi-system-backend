import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ConditionOperatorService } from './condition-operator.service';



import { ApiOperation } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import { ConditionOperatorResponseDto } from './dto/condition-operator-response.dto';
import { CreateConditionOperatorDto } from './dto/create-condition-operator.dto';
import { UpdateConditionOperatorDto } from './dto/update-condition-operator.dto';

@Controller('condition-operator')
export class ConditionOperatorController {
  constructor(private readonly conditionOperatorService: ConditionOperatorService) { }

  @Post()
  @ApiOperation({ summary: '[ Create condition-operator ]' })
  @ApiBaseResponse(ConditionOperatorResponseDto)
  @ResponseMessage('Create condition-operator success')
  async create(
    @Body() dto: CreateConditionOperatorDto,
  ): Promise<ConditionOperatorResponseDto> {

    return await this.conditionOperatorService.createConditionOperator(dto);
  }


  @Get()
  @ApiOperation({ summary: '[ Get all condition-operator ]' })
  @ApiBaseResponse(ConditionOperatorResponseDto, { isArray: true })
  @ResponseMessage('Get all condition-operator success')
  async findAll(): Promise<ConditionOperatorResponseDto[]> {
    return await this.conditionOperatorService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: '[ Update condition-operator ]' })
  @ApiBaseResponse(ConditionOperatorResponseDto)
  @ResponseMessage('Update condition-operator success')
  async update(@Param('id') xid: number
    , @Body() dto: UpdateConditionOperatorDto): Promise<ConditionOperatorResponseDto> {

    return await this.conditionOperatorService.updateConditionOperator(xid, dto)
  }

}
