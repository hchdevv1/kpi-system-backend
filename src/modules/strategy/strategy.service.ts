import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DbRetryHelper } from '../../common/helpers/db-retry.helper';
import { CodeGeneratorService } from '../../common/services/code-generator.service';
import { MstStrategy } from './entities/mst_strategy.entity';
import { MstStrategyGroup } from './entities/mst_strategy_group.entity';

import { XCreateStrategyGroupDto } from './dto/y-create-strategy-group.dto';
import { XStrategyGroupResponseDto } from './dto/y-strategy-group-response.dto';
import { XUpdateStrategyGroupDto } from './dto/y-update-strategy-group.dto';

import { XtrategyListResponseDto } from './dto/y-strategy-list-response.dto';
import { XCreateStrategyDto } from './dto/y-create-strategy.dto';
import { XUpdateStrtegyDto } from './dto/y-update-strategy.dto';

@Injectable()
export class StrategyService {


  constructor(
    @InjectRepository(MstStrategyGroup)
    private readonly strategyGroupRepo: Repository<MstStrategyGroup>,
    @InjectRepository(MstStrategy)
    private readonly strategyRepo: Repository<MstStrategy>,
    private readonly dbRetryHelper: DbRetryHelper,
    private readonly codeGenerator: CodeGeneratorService,
  ) { }


  async findAllStrategyGroup(): Promise<XStrategyGroupResponseDto[]> {
    const groups = await this.strategyGroupRepo.find({
      order: { id: 'ASC' },
    });
    return groups.map((g) => ({
      id: g.id,
      code: g.code,
      description: g.description,
    }));
  }
  async createStrategyGroup(dto: XCreateStrategyGroupDto): Promise<XStrategyGroupResponseDto> {
    const { description: descFromDto } = dto;
    return this.dbRetryHelper.onUnique(async () => {

      const lastRecord = await this.strategyGroupRepo.find({
        order: { id: 'DESC' },
        take: 1,
      });
      const lastCode = lastRecord[0]?.code;
      const runningCode = this.codeGenerator.generateByType("STRATEGYGROUP", lastCode)
      const entity = this.strategyGroupRepo.create({
        code: runningCode,
        description: descFromDto,
      })
      const saved = await this.strategyGroupRepo.save(entity);
      return {
        id: saved.id,
        code: saved.code,
        description: saved.description,
      };
    });
  }
  async updateStrategyGroup(
    xid: number, dto: XUpdateStrategyGroupDto): Promise<XStrategyGroupResponseDto> {
    const entity = await this.strategyGroupRepo.findOne({
      where: { id: xid },
    });
    if (!entity) {
      throw new NotFoundException('kpi simple group not found');
    }
    const { description } = dto;
    if (description !== undefined) {
      entity.description = description;
    }
    // 3. save
    const saved = await this.strategyGroupRepo.save(entity);
    return {
      id: saved.id,
      code: saved.code,
      description: saved.description,
    };
  }

  async createStrategy(dto: XCreateStrategyDto): Promise<XtrategyListResponseDto> {
    const { description, mst_strategy_group_id } = dto;
    return this.dbRetryHelper.onUnique(async () => {

      const lastRecord = await this.strategyRepo.find({
        order: { id: 'DESC' },
        take: 1,
      });
      const lastCode = lastRecord[0]?.code;
      const runningCode = this.codeGenerator.generateByType("STRATEGY", lastCode)
      const entity = this.strategyRepo.create({
        code: runningCode,
        description,
        mst_strategy_group_id: mst_strategy_group_id,
      });
      const saved = await this.strategyRepo.save(entity);
      const group = await this.strategyGroupRepo.findOne({
        where: { id: mst_strategy_group_id },
      });
      if (!group) {
        throw new NotFoundException('Service unit group not found');
      }
      return {
        kpistrategyGroup: {
          id: group.id,
          code: group.code,
          description: group.description,
          kpiStrategies: [
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

  async getStrategyGroupId(groupId: number): Promise<XtrategyListResponseDto> {

    const group = await this.strategyGroupRepo.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('kpi simple group not found');
    }

    const kpisimple = await this.strategyRepo.find({
      where: { mst_strategy_group_id: groupId },
      order: { id: 'ASC' },
    });

    return {
      kpistrategyGroup: {
        id: group.id,
        code: group.code,
        description: group.description,
        kpiStrategies: kpisimple.map((s) => ({
          id: s.id,
          code: s.code,
          description: s.description,
          is_active: s.is_active,
        })),
      },
    };
  }
  async updateStrategy(
    xid: number,
    dto: XUpdateStrtegyDto,
  ): Promise<XtrategyListResponseDto> {
    // 1. หา record + relation
    const entity = await this.strategyRepo.findOne({
      where: { id: xid },
      relations: ['strategyGroup'],
    });

    if (!entity) {
      throw new NotFoundException('KPI Strategy not found');
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
    const saved = await this.strategyRepo.save(entity);

    // 4. หา group

    const group = await this.strategyGroupRepo.findOne({
      where: { id: entity.mst_strategy_group_id },
    });

    if (!group) {
      throw new NotFoundException('KPI Strategy not found');
    }

    // 5. return เฉพาะตัวที่ update
    return {
      kpistrategyGroup: {
        id: group.id,
        code: group.code,
        description: group.description,
        kpiStrategies: [
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

