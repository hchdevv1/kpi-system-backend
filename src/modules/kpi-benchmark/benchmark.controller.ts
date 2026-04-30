import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BenchmarkService } from './benchmark.service';

import { ApiParam, ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import { BenchmarkResponseDto } from './dto/benchmark-response.dto';
import { CreateBenchmarkDto } from './dto/create-benchmark.dto';
import { UpdateBenchmarkDto} from './dto/update-benchmark.dto';
@Controller('benchmark')
export class BenchmarkController {
  constructor(private readonly benchmarkService: BenchmarkService) { }

  @Post()
  @ApiOperation({ summary: '[ Create benchmark ]' })
  @ApiBaseResponse(BenchmarkResponseDto)
  @ResponseMessage('Create benchmark success')
  async create(
    @Body() dto: CreateBenchmarkDto,
  ): Promise<BenchmarkResponseDto> {

    return await this.benchmarkService.createBenchmark(dto);
  }

  @Get()
  @ApiOperation({ summary: '[ Get all benchmark ]' })
  @ApiBaseResponse(BenchmarkResponseDto, { isArray: true })
  @ResponseMessage('Get all benchmark success')
  async findAll(): Promise<BenchmarkResponseDto[]> {
    return await this.benchmarkService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: '[ Update benchmark ]' })
  @ApiBaseResponse(BenchmarkResponseDto)
  @ResponseMessage('Update benchmark success')
  async update(@Param('id') xid:number
  ,@Body() dto:UpdateBenchmarkDto):Promise <BenchmarkResponseDto>{
  
  return await this.benchmarkService.updateBenchmark(xid,dto)
  }
}
