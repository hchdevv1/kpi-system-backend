import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';

import { ApiOperation } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import { KpiRolesResponseDto } from './dto/kpi-roles-response.dto';
import { SystemRolesResponseDto } from './dto/system-roles-response.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

   @Get('/system')
    @ApiOperation({ summary: '[ Get system roles ]' })
    @ApiBaseResponse(SystemRolesResponseDto, { isArray: true })
    @ResponseMessage('Get system roles success')
    async findSystemRoles(): Promise<SystemRolesResponseDto[]> {
      return await this.rolesService.findSystemRoles();
    }
     @Get('/kpi')
    @ApiOperation({ summary: '[ Get kpi roles ]' })
    @ApiBaseResponse(KpiRolesResponseDto, { isArray: true })
    @ResponseMessage('Get kpi roles success')
    async findKpiRoles(): Promise<KpiRolesResponseDto[]> {
      return await this.rolesService.findKpiRoles();
    }
}
