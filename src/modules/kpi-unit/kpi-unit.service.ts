import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MstUnit } from './entities/mst_kpi_unit.entity';
import { DbRetryHelper } from '../../common/helpers/db-retry.helper';
import { CodeGeneratorService } from '../../common/services/code-generator.service';

import { KPIUnitResponseDto } from './dto/kpi-unit-response.dto';
import { CreateKPIUnitDto } from './dto/create-kpi-unit.dto';
import { UpdateKPIUnitDto } from './dto/update-kpi-unit.dto';

@Injectable()
export class KpiUnitService {
  constructor(
    @InjectRepository(MstUnit)
    private readonly kpiunitRepo: Repository<MstUnit>,
    private readonly dbRetryHelper: DbRetryHelper,
    private readonly codeGenerator: CodeGeneratorService,
  ) { }

  async createKPIUnit(dto: CreateKPIUnitDto): Promise<KPIUnitResponseDto> {
    const { description: descFromDto } = dto;
    const { symbol: symbolFromDto } = dto;
    const { scale_factor: scalefactorFromDto } = dto;

    return this.dbRetryHelper.onUnique(async () => {

      const lastRecord = await this.kpiunitRepo.find({
        order: { id: 'DESC' },
        take: 1,
      });
      const lastCode = lastRecord[0]?.code;
      const runningCode = this.codeGenerator.generateByType("UNIT", lastCode)
      const entity = this.kpiunitRepo.create({
        code: runningCode,
        description: descFromDto,
        symbol: symbolFromDto,
        scale_factor: scalefactorFromDto ?? null,
      })
      const saved = await this.kpiunitRepo.save(entity);
      return {
        id: saved.id,
        code: saved.code,
        description: saved.description,
        is_active: saved.is_active,
        symbol: saved.symbol,
        scale_factor: saved.scale_factor ?? undefined,
        is_percent: saved.is_percent,
      };
    });
  }

  async findAll(): Promise<KPIUnitResponseDto[]> {
    const groups = await this.kpiunitRepo.find({
      order: { id: 'ASC' },
    });
    return groups.map((g) => ({
      id: g.id,
      code: g.code,
      description: g.description,
      symbol: g.symbol,
      scale_factor: g.scale_factor,
      is_active: g.is_active,
      is_percent: g.is_percent
    }));
  }
  async updateKPIUnit(
    xid: number, dto: UpdateKPIUnitDto): Promise<KPIUnitResponseDto> {

    // 1. หา record
    const entity = await this.kpiunitRepo.findOne({
      where: { id: xid },
    });
    if (!entity) {
      throw new NotFoundException('kpi unit not found');
    }
    // 2. update field (เฉพาะที่ส่งมา)
    const { description, is_active ,symbol,is_percent ,scale_factor} = dto;
    if (description !== undefined) {
      entity.description = description;
    }
     if (scale_factor !== undefined) {
      entity.scale_factor = scale_factor;
    }
      if (symbol !== undefined) {
      entity.symbol = symbol;
    }
    if (typeof is_active === 'boolean') {
      entity.is_active = is_active;
    }
     if (typeof is_percent === 'boolean') {
      entity.is_percent = is_percent;
    }
    // 3. save
    const saved = await this.kpiunitRepo.save(entity);

    return {
      id: saved.id,
      code: saved.code,
      description: saved.description,
      symbol:saved.symbol,
      scale_factor:saved.scale_factor,
      is_active: saved.is_active,
      is_percent:saved.is_percent
    };
  }
}
