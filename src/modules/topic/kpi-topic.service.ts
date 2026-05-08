import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DbRetryHelper } from '../../common/helpers/db-retry.helper';
import { CodeGeneratorService } from '../../common/services/code-generator.service';

import { MstTopic } from './entities/mst_topic.entity';
import { TopicResponseDto } from './dto/topic-response.dto';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { PagingQueryDto } from './dto/pagination-topic.dto';
import { PagingWithSearchQueryDto } from './dto/pagination-withsearch-topic.dto';
import { TopicListResponseDto } from './dto/topiclist-response-pagination.dto';
@Injectable()
export class KpiTopicService {
  constructor(
    @InjectRepository(MstTopic)
    private readonly topicRepo: Repository<MstTopic>,
    private readonly dbRetryHelper: DbRetryHelper,
    private readonly codeGenerator: CodeGeneratorService,
  ) { }

  async createkpiTopic(dto: CreateTopicDto): Promise<TopicResponseDto> {
    const { description: descFromDto } = dto;    //  { description: descFromDto }  is Destructuring (การดึงค่าออกจาก object) and rename to descFromDto
    const { alias_code: aliascodeFromDto } = dto;

    return this.dbRetryHelper.onUnique(async () => {
      const lastRecord = await this.topicRepo.find({
        order: { id: 'DESC' },
        take: 1,
      });

      const lastCode = lastRecord[0]?.code;
      const runningCode = this.codeGenerator.generateByType("KPITOPIC", lastCode)
      const entity = this.topicRepo.create({
        code: runningCode,
        description: descFromDto,
        alias_code: aliascodeFromDto ?? null,
      })
      console.log(entity)
      const saved = await this.topicRepo.save(entity);
      return {
        id: saved.id,
        code: saved.code,
        description: saved.description,
        is_active: saved.is_active,
        alias_code: saved.alias_code ?? undefined,
      };
    });
  }
  async findAll(query: PagingQueryDto): Promise<TopicListResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;
    const qb = this.topicRepo.createQueryBuilder('t');

    const [data, total] = await qb
      .orderBy('t.id', 'ASC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      kpis: data.map((g) => ({
        id: g.id,
        code: g.code,
        description: g.description,
        is_active: g.is_active,
        alias_code: g.alias_code ?? '',
      })),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  async findAllWithSearch(query: PagingWithSearchQueryDto): Promise<TopicListResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const search = query.search?.trim();

    const skip = (page - 1) * limit;

    const qb = this.topicRepo.createQueryBuilder('t');
    console.log(search?.length)
    // 🔹 search (optional)
    if (search && search.length < 5) {
      return {
        kpis: [],
        meta: {
          page,
          limit,
          total: 0,
          totalPages: 0,
        },
      };
    }
    if (search && search.length >= 5) {
      qb.where(
        `(t.description ILIKE :search OR t.alias_code ILIKE :search)`,
        {
          search: `%${search}%`,
        },
      );
    }
    const [data, total] = await qb
      .orderBy('t.id', 'ASC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      kpis: data.map((g) => ({
        id: g.id,
        code: g.code,
        description: g.description,
        is_active: g.is_active,
        alias_code: g.alias_code ?? '',
      })),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  async updatekpiTopic(
    xid: number, dto: UpdateTopicDto): Promise<TopicResponseDto> {

    // 1. หา record
    const entity = await this.topicRepo.findOne({
      where: { id: xid },
    });
    if (!entity) {
      throw new NotFoundException('kpiTopic not found');
    }
    // 2. update field (เฉพาะที่ส่งมา)
    const { description, is_active, alias_code } = dto;
    if (description !== undefined) {
      entity.description = description;
    }
    if (alias_code !== undefined) {
      entity.alias_code = alias_code;
    }
    if (typeof is_active === 'boolean') {
      entity.is_active = is_active;
    }
    // 3. save
    const saved = await this.topicRepo.save(entity);

    return {
      id: saved.id,
      code: saved.code,
      description: saved.description,
      is_active: saved.is_active,
      alias_code: saved.alias_code ?? undefined,
    };
  };
}

