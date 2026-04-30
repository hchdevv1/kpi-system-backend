import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MstFrequency } from './entities/mst_frequency.entity';
import { DbRetryHelper } from '../../common/helpers/db-retry.helper';
import { CodeGeneratorService } from '../../common/services/code-generator.service';

import { FrequencyResponseDto } from './dto/frequency-response.dto';
import { CreateFrequencyDto } from './dto/create-frequency.dto';
import { UpdateFrequencyDto } from './dto/update-frequency.dto';
@Injectable()
export class FrequencyService {
  constructor(
    @InjectRepository(MstFrequency)
    private readonly frequencyRepo: Repository<MstFrequency>,
    private readonly dbRetryHelper: DbRetryHelper,
    private readonly codeGenerator: CodeGeneratorService,
  ) { }

  async createFrequency(dto: CreateFrequencyDto): Promise<FrequencyResponseDto> {
    const { description: descFromDto } = dto;    //  { description: descFromDto }  is Destructuring (การดึงค่าออกจาก object) and rename to descFromDto
    const { interval_value:interval_value} =dto
    return this.dbRetryHelper.onUnique(async () => {

      const lastRecord = await this.frequencyRepo.find({
        order: { id: 'DESC' },
        take: 1,
      });
      const lastCode = lastRecord[0]?.code;
      const runningCode = this.codeGenerator.generateByType("FREQUENCY", lastCode)
      const entity = this.frequencyRepo.create({
        code: runningCode,
        description: descFromDto,
        interval_value:interval_value
      })
      const saved = await this.frequencyRepo.save(entity);
      return {
        id: saved.id,
        code: saved.code,
        description: saved.description,
        interval_value:saved.interval_value,
        is_active: saved.is_active
      };
    });
  }

  async findAll(): Promise<FrequencyResponseDto[]> {
    const groups = await this.frequencyRepo.find({
      order: { id: 'ASC' },
    });
    return groups.map((g) => ({
      id: g.id,
      code: g.code,
      description: g.description,
      interval_value:g.interval_value,
      is_active: g.is_active
    }));
  }
  async updateFrequency(
    xid: number, dto: UpdateFrequencyDto): Promise<FrequencyResponseDto> {

    // 1. หา record
    const entity = await this.frequencyRepo.findOne({
      where: { id: xid },
    });
    if (!entity) {
      throw new NotFoundException('frequency not found');
    }
    // 2. update field (เฉพาะที่ส่งมา)
    const { description, is_active, interval_value} = dto;
    if (description !== undefined) {
      entity.description = description;
    }
     if (interval_value !== undefined) {
      entity.interval_value = interval_value;
    }
    if (typeof is_active === 'boolean') {
      entity.is_active = is_active;
    }
    // 3. save
    const saved = await this.frequencyRepo.save(entity);

    return {
      id: saved.id,
      code: saved.code,
      description: saved.description,
      interval_value:saved.interval_value,
      is_active: saved.is_active
    };
  }
}
