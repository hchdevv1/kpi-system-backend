

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DbRetryHelper } from '../../common/helpers/db-retry.helper';
import { CodeGeneratorService } from '../../common/services/code-generator.service';
import { MstSimpleGroup } from './entities/mst_simple_group.entity';
import { MstSimple } from './entities/mst_simple.entity';


import { SimpleGroupResponseDto } from './dto/simple-group-response.dto';
import { CreateSimpleGroupDto } from './dto/create-simple-group.dto';
import { UpdateSimpleGroupDto } from './dto/update-simple-group.dto';

import { SimpleListResponseDto } from './dto/simple-list-response.dto';
import { CreateSimpleDto } from './dto/create-simple.dto';
import { UpdateSimpleDto } from './dto/update-simple.dto';
@Injectable()
export class KpiSimpleService {
  constructor(
    @InjectRepository(MstSimpleGroup)
    private readonly simpleGroupRepo: Repository<MstSimpleGroup>,
    @InjectRepository(MstSimple)
    private readonly simpleRepo: Repository<MstSimple>,
    private readonly dbRetryHelper: DbRetryHelper,
    private readonly codeGenerator: CodeGeneratorService,
  ) { }

  async createSimpleGroup(dto: CreateSimpleGroupDto): Promise<SimpleGroupResponseDto> {
    const { description: descFromDto } = dto;
    return this.dbRetryHelper.onUnique(async () => {

      const lastRecord = await this.simpleGroupRepo.find({
        order: { id: 'DESC' },
        take: 1,
      });
      const lastCode = lastRecord[0]?.code;
      const runningCode = this.codeGenerator.generateByType("KPISIMPLEGROUP", lastCode)
      const entity = this.simpleGroupRepo.create({
        code: runningCode,
        description: descFromDto,
      })
      const saved = await this.simpleGroupRepo.save(entity);
      return {
        id: saved.id,
        code: saved.code,
        description: saved.description,
      };
    });
  }


  async findAllSimpleGroup(): Promise<SimpleGroupResponseDto[]> {
    const groups = await this.simpleGroupRepo.find({
      order: { id: 'ASC' },
    });
    return groups.map((g) => ({
      id: g.id,
      code: g.code,
      description: g.description,
    }));
  }

  async updateSimpleGroup(
    xid: number, dto: UpdateSimpleGroupDto): Promise<SimpleGroupResponseDto> {

    // 1. หา record
    const entity = await this.simpleGroupRepo.findOne({
      where: { id: xid },
    });
    if (!entity) {
      throw new NotFoundException('kpi simple group not found');
    }
    // 2. update field (เฉพาะที่ส่งมา)
    const { description } = dto;
    if (description !== undefined) {
      entity.description = description;
    }

    // 3. save
    const saved = await this.simpleGroupRepo.save(entity);

    return {
      id: saved.id,
      code: saved.code,
      description: saved.description,
    };
  }
  async getSimpleGroupId(groupId: number): Promise<SimpleListResponseDto> {

    const group = await this.simpleGroupRepo.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('kpi simple group not found');
    }

    const kpisimple = await this.simpleRepo.find({
      where: { simple_group_id: groupId },
      relations: ['kpisimplegroup'],
      order: { id: 'ASC' },
    });

    return {
      kpisimpleGroup: {
        id: group.id,
        code: group.code,
        description: group.description,
        kpisimple: kpisimple.map((s) => ({
          id: s.id,
          code: s.code,
          description: s.description,
          is_active: s.is_active,
        })),
      },
    };
  }
  /*
  async createSimple(dto: CreateSimpleDto): Promise<SimpleListResponseDto> {
    const { description, simple_group_id } = dto;
    return this.dbRetryHelper.onUnique(async () => {

      const lastRecord = await this.simpleRepo.find({
        order: { id: 'DESC' },
        take: 1,
      });
      const lastCode = lastRecord[0]?.code;
      const runningCode = this.codeGenerator.generateByType("KPISIMPLE", lastCode)
      const entity = this.simpleRepo.create({
        code: runningCode,
        description,
        kpisimpleGroup: { id: simple_group_id }, // ✅ ใช้ relation object
      });
      const saved = await this.simpleRepo.save(entity);
      const group = await this.simpleGroupRepo.findOne({
        where: { id: simple_group_id },
        relations: ['kpisimplegroup'], // 👈 ชื่อ field ต้องตรง entity
      });
      if (!group) {
        throw new NotFoundException('Service unit group not found');
      }
      return {
        kpisimpleGroup: {
          id: group.id,
          code: group.code,
          description: group.description,
          kpisimple: [
            {
              id: saved.id,
              code: saved.code,
              description: saved.description,
              is_active: saved.is_active,
            },
          ],
        },
      };
    });
  }*/
  async createSimple(dto: CreateSimpleDto): Promise<SimpleListResponseDto> {
    const { description, simple_group_id } = dto;
    return this.dbRetryHelper.onUnique(async () => {

      const lastRecord = await this.simpleRepo.find({
        order: { id: 'DESC' },
        take: 1,
      });
      const lastCode = lastRecord[0]?.code;
      const runningCode = this.codeGenerator.generateByType("KPISIMPLE", lastCode)
       const entity = this.simpleRepo.create({
      code: runningCode,
      description,
      simple_group_id: simple_group_id, 
    });
      const saved = await this.simpleRepo.save(entity);
      const group = await this.simpleGroupRepo.findOne({
        where: { id: simple_group_id },
      });
      if (!group) {
        throw new NotFoundException('Service unit group not found');
      }
     return {
      kpisimpleGroup: {
        id: group.id,
        code: group.code,
        description: group.description,
        kpisimples: [
          {
            id: saved.id,
            code: saved.code,
            description: saved.description,
            is_active: saved.is_active,
          },
        ],
      },
    };
  });
  }
  async updateSimple(
    xid: number,
    dto: UpdateSimpleDto,
  ): Promise<SimpleListResponseDto> {

    // 1. หา record + relation
    const entity = await this.simpleRepo.findOne({
      where: { id: xid },
      relations: ['kpisimplegroup'],
    });

    if (!entity) {
      throw new NotFoundException('Service unit not found');
    }

    // 2. update field
    const { description, is_active } = dto;

    if (description !== undefined) {
      entity.description = description;
    }

    if (typeof is_active === 'boolean') {
      entity.is_active = is_active;
    }

    // 3. save
    const saved = await this.simpleRepo.save(entity);

    // 4. หา group
    const group = entity.kpisimplegroup;


    if (!group) {
      throw new NotFoundException('Service unit group not found');
    }

    // 5. return เฉพาะตัวที่ update
    return {
      kpisimpleGroup: {
        id: group.id,
        code: group.code,
        description: group.description,
        kpisimple: [
          {
            id: saved.id,
            code: saved.code,
            description: saved.description,
            is_active: saved.is_active,
          },
        ],
      },
    };
  }
}
