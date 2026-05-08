import { Controller, Get, Post, ParseIntPipe, Body, Patch, Param } from '@nestjs/common';
import { ServiceUnitService } from './service-unit.service';

import { ApiParam, ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import { ServiceUnitGroupResponseDto } from './dto/service-unit-group-response.dto';
import { CreateServiceUnitGroupDto } from './dto/create-service-unit-group.dto';
import { UpdateServiceUnitGroupDto } from './dto/update-service-unit-group.dto';

import { ServiceUnitListResponseDto } from './dto/service-unit-list-response.dto';
import { CreateServiceUnitDto } from './dto/create-service-unit.dto';
import { UpdateServiceUnitDto } from './dto/update-service-unit.dto';
@Controller('service-unit')
export class ServiceUnitController {
  constructor(private readonly serviceUnitService: ServiceUnitService) { }


  @Post('/group')
  @ApiOperation({ summary: '[ Create service-unit group  ]' })
  @ApiBaseResponse(ServiceUnitGroupResponseDto)
  @ResponseMessage('Create service-unit group success')
  async createServiceUnitGroup(
    @Body() dto: CreateServiceUnitGroupDto,
  ): Promise<ServiceUnitGroupResponseDto> {

    return await this.serviceUnitService.createServiceUnitGroup(dto);
  }

  @Get('/group')
  @ApiOperation({ summary: '[ Get all service-unit group ]' })
  @ApiBaseResponse(ServiceUnitGroupResponseDto, { isArray: true })
  @ResponseMessage('Get all service-unit group success')
  async findAllServiceUnitGroup(): Promise<ServiceUnitGroupResponseDto[]> {
    return await this.serviceUnitService.findAllServiceUnitGroup();
  }

  @Patch('/group/:id')
  @ApiOperation({ summary: '[ Update service-unit group ]' })
  @ApiBaseResponse(ServiceUnitGroupResponseDto)
  @ResponseMessage('Update service-unit group success')
  async updateServiceUnitGroup(@Param('id') xid: number
    , @Body() dto: UpdateServiceUnitGroupDto): Promise<ServiceUnitGroupResponseDto> {

    return await this.serviceUnitService.updateServiceUnitGroup(xid, dto)
  }


  @Post('details')
  @ApiOperation({ summary: '[ Create service-unit ]' })
  @ApiBaseResponse(CreateServiceUnitDto)
  @ResponseMessage('Create service-unit group success')
  async createServiceUnit(
    @Body() dto: CreateServiceUnitDto,
  ): Promise<ServiceUnitListResponseDto> {

    return await this.serviceUnitService.createServiceUnit(dto);
  }


  @Get('details/:groupId')
  @ApiOperation({ summary: '[ Get service-unit by group id ]' })
  @ApiParam({
    name: 'groupId',
    type: Number,
    example: 1,
  })
  @ApiBaseResponse(ServiceUnitListResponseDto)
  @ApiNotFoundResponse({ description: '[ service-unit group not found ]' })
  @ResponseMessage('Get service-unit by group success')
  async getByGroupId(
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    return await this.serviceUnitService.getServiceUnitByGroupId(groupId);
  }
   @Patch('/details/:id')
  @ApiOperation({ summary: '[ Update service-unit ]' })
  @ApiBaseResponse(ServiceUnitGroupResponseDto)
  @ResponseMessage('Update service-unit success')
  async updateServiceUnit(@Param('id') xid: number
    , @Body() dto: UpdateServiceUnitDto): Promise<ServiceUnitListResponseDto> {

    return await this.serviceUnitService.updateServiceUnit(xid, dto)
  }
}
