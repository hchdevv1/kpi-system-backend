
import { Controller, Get, Post, ParseIntPipe, Body, Patch, Param } from '@nestjs/common';
import { OrganizationService } from './organization.service';

import { ApiParam, ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import { XOrganizationGroupResponseDto} from './dto/y-organization-group-response.dto';
import { XCreateOrganizationGroupDto} from './dto/y-create-organization-group.dto';
import {XUpdateorganzationGroupDto } from './dto/y-update-organzation-group.dto';

import { XOrganzationListResponseDto } from './dto/y-organzation-list-response.dto';
import { XUpdateOrganizationDto } from './dto/y-update-organzation.dto';
import {XCreateOrganizationDto} from './dto/y-create-organization.dto'
/*
import { ApiParam, ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';
import { MstOrganization } from './entities/mst_organization.entity';
import { MstOrganizationGroup } from './entities/mst_organization_group.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { GetOrganizationGroupResponseDto } from './dto/organization-group-response.dto';
import { OrganizationGroupDto } from './dto/organization-group.dto';
import { XCreateOrganizationGroupDto} from './dto/1create-organization-group.dto';
import { XOrganizationGroupDto } from './dto/1organization-group.dto';
import { XUpdateOrganizationGroupDto } from './dto/1update-organization-group.dto';
*/
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }


     @Post('/group')
      @ApiOperation({ summary: '[ Create organzation group  ]' })
      @ApiBaseResponse(XOrganizationGroupResponseDto)
      @ResponseMessage('Create organzation group success')
      async createSimpleGroup(
        @Body() dto: XCreateOrganizationGroupDto,
      ): Promise<XOrganizationGroupResponseDto> {
    
        return await this.organizationService.createStrategyGroup(dto);
      }

    @Get('/group')
     @ApiOperation({ summary: '[ Get all organzation group ]' })
     @ApiBaseResponse(XOrganizationGroupResponseDto, { isArray: true })
     @ResponseMessage('Get all organzation group success')
     async findAllSimpleGroup(): Promise<XOrganizationGroupResponseDto[]> {
       return await this.organizationService.findAllOrganzationGroup();
     }

 @Patch('/group/:id')
  @ApiOperation({ summary: '[ Update organzation group ]' })
  @ApiBaseResponse(XOrganizationGroupResponseDto)
  @ResponseMessage('Update organzation group success')
  async updateSimpleGroup(@Param('id') xid: number
    , @Body() dto: XUpdateorganzationGroupDto): Promise<XOrganizationGroupResponseDto> {

    return await this.organizationService.updateOrganzationGroup(xid, dto)
  }

  @Post('details')
      @ApiOperation({ summary: '[ Create organzation detail ]' })
      @ApiBaseResponse(XOrganzationListResponseDto)
      @ResponseMessage('Create organzation detail success')
      async createServiceUnit(
        @Body() dto: XCreateOrganizationDto,
      ): Promise<XOrganzationListResponseDto> {
    
        return await this.organizationService.createOrganzation(dto);
      }

   @Get('details/:groupId')
    @ApiOperation({ summary: '[ Get kpi organzation detail by group id ]' })
    @ApiParam({
      name: 'groupId',
      type: Number,
      example: 1,
    })
    @ApiBaseResponse(XOrganzationListResponseDto)
    @ApiNotFoundResponse({ description: '[ kpi organzation detail not found ]' })
    @ResponseMessage('Get kip organzation detail by group success')
    async getByGroupId(
      @Param('groupId', ParseIntPipe) groupId: number,
    ) {
      return await this.organizationService.getOrganzationGroupId(groupId);
    }

      @Patch('/details/:id')
        @ApiOperation({ summary: '[ Update organzation detail ]' })
        @ApiBaseResponse(XOrganzationListResponseDto)
        @ResponseMessage('Update organzation detail success')
        async updateStrategy(@Param('id') xid: number
          , @Body() dto: XUpdateOrganizationDto): Promise<XOrganzationListResponseDto> {
      
          return await this.organizationService.updateOrganization(xid, dto)
        }
}
/*
  @Post()
  @ApiOperation({ summary: 'Create strategy' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  async create(@Body() dto: CreateOrganizationDto) {
    const result = await this.organizationService.createOrganization(

      dto.description,
      dto.organization_group_id,
    );

    return {
      success: true,
      message: 'Create strategy success',
      data: result,
    };
  }



@Post('group')
@ApiOperation ({summary:'Create organization group >>>> '})
@ApiBaseResponse(XOrganizationGroupDto)
@ResponseMessage('Create organization group success')
async creategroup(@Body() dto:XCreateOrganizationGroupDto){
  return await this.organizationService.createOrganizationGroup(dto);
}

@Patch('group/:id')
@ApiOperation({ summary: 'Update organization group' })
@ApiParam({
  name: 'id',
  type: Number,
  example: 1,
})
@ApiBaseResponse(XOrganizationGroupDto)
@ApiNotFoundResponse({
  description: 'Organization group not found',
})
@ResponseMessage('Update organization group success')
async update(
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: XUpdateOrganizationGroupDto,
) {
  return await this.organizationService.editOrganizationGroup(id, dto);
}


  @Get()
  @ApiOperation({ summary: 'Get organization' })
  @ApiBaseResponse(GetOrganizationGroupResponseDto)
  @ApiBaseResponse(OrganizationGroupDto)
  @ApiNotFoundResponse({ description: 'Organization not found' })
  @ResponseMessage('Get organization success')
  async getAll() {
    return await this.organizationService.getOrganization();
  }

  @Get('group')
  @ApiOperation({ summary: 'Get organization groups' })
  @ApiBaseResponse(GetOrganizationGroupResponseDto)
  @ApiNotFoundResponse({ description: 'Organization group not found' })
  @ResponseMessage('Get organization groups success')
  async getGroups() {
    return await this.organizationService.getOrganizationGroups();
  }



  @Get('group/:groupId')
  @ApiOperation({ summary: 'Get organization by group id' })
  @ApiParam({
    name: 'groupId',
    type: Number,
    example: 1,
  })
  @ApiBaseResponse(GetOrganizationGroupResponseDto)
  @ApiNotFoundResponse({ description: 'Organization group not found' })
  @ResponseMessage('Get organization by group success')
  async getByGroupId(
    @Param('groupId', ParseIntPipe) groupId: number,
  ) {
    return await this.organizationService.getOrganizationByGroupId(groupId);
  }

  */