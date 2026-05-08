import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DbRetryHelper } from '../../common/helpers/db-retry.helper';
import { CodeGeneratorService } from '../../common/services/code-generator.service';
import { MstBenchmark } from './entities/mst_benchmark.entity';

import { BenchmarkResponseDto } from './dto/benchmark-response.dto';
import { CreateBenchmarkDto} from './dto/create-benchmark.dto';
import { UpdateBenchmarkDto } from './dto/update-benchmark.dto';
@Injectable()
export class BenchmarkService {
  constructor(
    @InjectRepository(MstBenchmark)
    private readonly benchmarkRepo: Repository<MstBenchmark>,
    private readonly dbRetryHelper: DbRetryHelper,
    private readonly codeGenerator: CodeGeneratorService,
  ) { }

    async createBenchmark(dto: CreateBenchmarkDto): Promise<BenchmarkResponseDto> {
      const { description: descFromDto } = dto;    //  { description: descFromDto }  is Destructuring (การดึงค่าออกจาก object) and rename to descFromDto
      return this.dbRetryHelper.onUnique(async () => {
  
        const lastRecord = await this.benchmarkRepo.find({
          order: { id: 'DESC' },
          take: 1,
        });
        const lastCode = lastRecord[0]?.code;
        const runningCode = this.codeGenerator.generateByType("BENCHMARK", lastCode)
        const entity = this.benchmarkRepo.create({
          code: runningCode,
          description: descFromDto
        })
        const saved = await this.benchmarkRepo.save(entity);
        return {
          id: saved.id,
          code: saved.code,
          description: saved.description,
          is_active: saved.is_active
        };
      });
    }

  async findAll(): Promise<BenchmarkResponseDto[]> {
    const groups = await this.benchmarkRepo.find({
      order: { id: 'ASC' },
    });
    return groups.map((g) => ({
      id: g.id,
      code: g.code,
      description: g.description,
      is_active: g.is_active
    }));
  }
  async updateBenchmark(
    xid: number, dto: UpdateBenchmarkDto): Promise<BenchmarkResponseDto> {

    // 1. หา record
    const entity = await this.benchmarkRepo.findOne({
      where: { id: xid },
    });
    if (!entity) {
      throw new NotFoundException('Benchmark not found');
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
    const saved = await this.benchmarkRepo.save(entity);

    return {
      id: saved.id,
      code: saved.code,
      description: saved.description,
      is_active: saved.is_active
    };
  }
}
