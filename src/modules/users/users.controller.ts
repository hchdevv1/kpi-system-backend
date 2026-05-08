import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


import { ApiParam, ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';

import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import { UserTrakcareResponseDto } from './dto/user-trakcare-response.dto';
import { CreateUserSystemDto } from './dto/create-user-system.dto';
import { UserSystemResponseDto } from './dto/create-user-system-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/system')
  @ApiOperation({ summary: '[ Create kpi unit ]' })
  @ApiBaseResponse(UserSystemResponseDto)
  @ResponseMessage('Create kpi unit success')
  async create(
    @Body() dto: CreateUserSystemDto,
  ): Promise<UserSystemResponseDto> {

    return await this.usersService.createUserSysytem(dto);
  }
  

  @Get('usertrakcare/:code')
  @ApiOperation({ summary: '[ Get user by code ]' })
  @ApiBaseResponse(UserTrakcareResponseDto)
  @ResponseMessage('Get user success')
  async getUser(
    @Param('code') code: string,
  ): Promise<UserTrakcareResponseDto> {
    return this.usersService.getUserByCode(code);
  }
}
