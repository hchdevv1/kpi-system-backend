import { Controller, Get, Post, Body, Patch,Param } from '@nestjs/common';
import { FrequencyService } from './frequency.service';

import { ApiOperation } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import { FrequencyResponseDto } from './dto/frequency-response.dto';
import { CreateFrequencyDto } from './dto/create-frequency.dto';
import { UpdateFrequencyDto} from './dto/update-frequency.dto';
@Controller('frequency')
export class FrequencyController {
  constructor(private readonly frequencyService: FrequencyService) { }

  @Post()
  @ApiOperation({ summary: '[ Create frequency ]' })
  @ApiBaseResponse(FrequencyResponseDto)
  @ResponseMessage('Create frequency success')
  async create(
    @Body() dto: CreateFrequencyDto,
  ): Promise<FrequencyResponseDto> {

    return await this.frequencyService.createFrequency(dto);
  }

  @Get()
  @ApiOperation({ summary: '[ Get all frequency ]' })
  @ApiBaseResponse(FrequencyResponseDto, { isArray: true })
  @ResponseMessage('Get all frequency success')
  async findAll(): Promise<FrequencyResponseDto[]> {
    return await this.frequencyService.findAll();
  }

    @Patch(':id')
    @ApiOperation({ summary: '[ Update frequency ]' })
    @ApiBaseResponse(FrequencyResponseDto)
    @ResponseMessage('Update frequency success')
    async update(@Param('id') xid:number
    ,@Body() dto:UpdateFrequencyDto):Promise <FrequencyResponseDto>{
    
    return await this.frequencyService.updateFrequency(xid,dto)
    }

}
