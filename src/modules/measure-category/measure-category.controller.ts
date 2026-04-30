import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeasureCategoryService } from './measure-category.service';

import { ApiParam, ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ApiBaseResponse } from 'src/common/decorators/api-response.decorator';

import { MeasureCategoryResponseDto } from './dto/measure-category-response.dto';
import { CreateMeasureCategoryDto } from './dto/create-measure-category.dto';
import { UpdateMeasureCategoryDto } from './dto/update-measure-category.dto';

@Controller('measure-category')
export class MeasureCategoryController {
  constructor(private readonly measureCategoryService: MeasureCategoryService) { }


  @Post()
  @ApiOperation({ summary: '[ Create measure categories ]' })
  @ApiBaseResponse(MeasureCategoryResponseDto)
  @ResponseMessage('Create measure categories success')
  async create(
    @Body() dto: CreateMeasureCategoryDto,
  ): Promise<MeasureCategoryResponseDto> {

    return await this.measureCategoryService.createMeasureCategory(dto);
  }

  @Get()
  @ApiOperation({ summary: '[ Get all measure categories ]' })
  @ApiBaseResponse(MeasureCategoryResponseDto, { isArray: true })
  @ResponseMessage('Get all measure categories success')
  async findAll():Promise<MeasureCategoryResponseDto[]> {
    return await this.measureCategoryService.findAll();

  }
@Patch(':id')
@ApiOperation({ summary: '[ Update measure category ]' })
@ApiBaseResponse(MeasureCategoryResponseDto)
@ResponseMessage('Update measure category success')
async update(@Param('id') xid:number
,@Body() dto:UpdateMeasureCategoryDto):Promise <MeasureCategoryResponseDto>{

return await this.measureCategoryService.updateMeasureCategory(xid,dto)
}

}
