
import { Controller, Get, Post, ParseIntPipe, Body, Patch, Param } from '@nestjs/common';
import { OrganizationService } from './organization.service';

import { ApiParam, ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import { OrganizationGroupResponseDto } from './dto/organization-group-response.dto';
import { CreateOrganizationGroupDto } from './dto/create-organization-group.dto';
import { UpdateorganzationGroupDto } from './dto/update-organzation-group.dto';

import { OrganzationListResponseDto } from './dto/organzation-list-response.dto';
import { UpdateOrganizationDto } from './dto/update-organzation.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto'

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }


  @Post('/group')
  @ApiOperation({ summary: '[ Create organzation group  ]' })
  @ApiBaseResponse(OrganizationGroupResponseDto)
  @ResponseMessage('Create organzation group success')
  async createSimpleGroup(
    @Body() dto: CreateOrganizationGroupDto,
  ): Promise<OrganizationGroupResponseDto> {

    return await this.organizationService.createStrategyGroup(dto);
  }

  @Get('/group')
  @ApiOperation({ summary: '[ Get all organzation group ]' })
  @ApiBaseResponse(OrganizationGroupResponseDto, { isArray: true })
  @ResponseMessage('Get all organzation group success')
  async findAllSimpleGroup(): Promise<OrganizationGroupResponseDto[]> {
    return await this.organizationService.findAllOrganzationGroup();
  }

  @Patch('/group/:id')
  @ApiOperation({ summary: '[ Update organzation group ]' })
  @ApiBaseResponse(OrganizationGroupResponseDto)
  @ResponseMessage('Update organzation group success')
  async updateSimpleGroup(@Param('id') xid: number
    , @Body() dto: UpdateorganzationGroupDto): Promise<OrganizationGroupResponseDto> {

    return await this.organizationService.updateOrganzationGroup(xid, dto)
  }

  @Post('details')
  @ApiOperation({ summary: '[ Create organzation detail ]' })
  @ApiBaseResponse(OrganzationListResponseDto)
  @ResponseMessage('Create organzation detail success')
  async createServiceUnit(
    @Body() dto: CreateOrganizationDto,
  ): Promise<OrganzationListResponseDto> {

    return await this.organizationService.createOrganzation(dto);
  }

  @Get('details/:groupId')
  @ApiOperation({ summary: '[ Get kpi organzation detail by group id ]' })
  @ApiParam({
    name: 'groupId',
    type: Number,
    example: 1,
  })
  @ApiBaseResponse(OrganzationListResponseDto)
  @ApiNotFoundResponse({ description: '[ kpi organzation detail not found ]' })
  @ResponseMessage('Get kip organzation detail by group success')
  async getByGroupId(
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    return await this.organizationService.getOrganzationGroupId(groupId);
  }

  @Patch('/details/:id')
  @ApiOperation({ summary: '[ Update organzation detail ]' })
  @ApiBaseResponse(OrganzationListResponseDto)
  @ResponseMessage('Update organzation detail success')
  async updateStrategy(@Param('id') xid: number
    , @Body() dto: UpdateOrganizationDto): Promise<OrganzationListResponseDto> {
    return await this.organizationService.updateOrganization(xid, dto)
  }
}
