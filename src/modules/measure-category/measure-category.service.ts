import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DbRetryHelper } from '../../common/helpers/db-retry.helper';
import { CodeGeneratorService } from '../../common/services/code-generator.service';

import { MstMeasure } from './entities/mst_measure.entity';
import { CreateMeasureCategoryDto } from './dto/create-measure-category.dto';
import { MeasureCategoryResponseDto } from './dto/measure-category-response.dto';
import { UpdateMeasureCategoryDto } from './dto/update-measure-category.dto';

@Injectable()
export class MeasureCategoryService {
  constructor(

    @InjectRepository(MstMeasure)
    private readonly measurecategoriesRepo: Repository<MstMeasure>,
    private readonly dbRetryHelper: DbRetryHelper,
    private readonly codeGenerator: CodeGeneratorService,

  ) { }

  async createMeasureCategory(dto: CreateMeasureCategoryDto): Promise<MeasureCategoryResponseDto> {
    const { description: descFromDto } = dto;    //  { description: descFromDto }  is Destructuring (การดึงค่าออกจาก object) and rename to descFromDto
    return this.dbRetryHelper.onUnique(async () => {

      const lastRecord = await this.measurecategoriesRepo.find({
        order: { id: 'DESC' },
        take: 1,
      });
      const lastCode = lastRecord[0]?.code;
      const runningCode = this.codeGenerator.generateByType("MEASURE", lastCode)
      const entity = this.measurecategoriesRepo.create({
        code: runningCode,
        description: descFromDto
      })
      const saved = await this.measurecategoriesRepo.save(entity);
      return {
        id: saved.id,
        code: saved.code,
        description: saved.description,
        is_active: saved.is_active
      };
    });
  }

  async findAll(): Promise<MeasureCategoryResponseDto[]> {
    const groups = await this.measurecategoriesRepo.find({
      order: { id: 'ASC' },
    });
    return groups.map((g) => ({
      id: g.id,
      code: g.code,
      description: g.description,
      is_active: g.is_active
    }));
  }

  async updateMeasureCategory(
    xid: number, dto: UpdateMeasureCategoryDto): Promise<MeasureCategoryResponseDto> {

    // 1. หา record
    const entity = await this.measurecategoriesRepo.findOne({
      where: { id: xid },
    });
    if (!entity) {
      throw new NotFoundException('Measure category not found');
    }
    // 2. update field (เฉพาะที่ส่งมา)
    const { description, is_active } = dto;
    if (description !== undefined) {
      entity.description = description;
    }
    if (typeof is_active === 'boolean') {
      entity.is_active = is_active;
    }
    // 3. save
    const saved = await this.measurecategoriesRepo.save(entity);

    return {
      id: saved.id,
      code: saved.code,
      description: saved.description,
      is_active: saved.is_active
    };
  }
}
