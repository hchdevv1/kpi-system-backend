import { Injectable , BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MstStrategy } from './entities/mst_strategy.entity';
import { MstStrategyGroup } from './entities/mst_strategy_group.entity';
import { StrategyGroupResponseDto ,GetStrategyByGroupResponseDto} from './dto/strategy-group-response.dto';
import { CreateStrategyResponseDto} from './dto/strategy-create-response.dto';

@Injectable()
export class StrategyService {
  constructor(
    @InjectRepository(MstStrategy)
    private readonly strategyRepo: Repository<MstStrategy>,

    @InjectRepository(MstStrategyGroup)
    private readonly strategyGroupRepo: Repository<MstStrategyGroup>,
  ) {}

async createStrategyGroup(code: string, description: string) {
    const exists = await this.strategyGroupRepo.findOne({
      where: { code },
    });

    if (exists) {
      throw new BadRequestException('Strategy group code already exists');
    }

    const entity = this.strategyGroupRepo.create({
      code,
      description,
    });

    return this.strategyGroupRepo.save(entity);
  }

  async createStrategy(
  description: string,
  groupId: number,
): Promise<CreateStrategyResponseDto> {
  const group = await this.strategyGroupRepo.findOne({
    where: { id: groupId },
  });

  if (!group) {
    throw new NotFoundException('Strategy group not found');
  }

  const lastStrategy = await this.strategyRepo
    .createQueryBuilder('s')
    .where('s.mst_strategy_group_id = :groupId', { groupId })
    .orderBy('s.id', 'DESC')
    .getOne();

  let nextNumber = 1;

  if (lastStrategy?.code) {
    const parts = lastStrategy.code.split('-');
    nextNumber = parseInt(parts[1] || '0', 10) + 1;
  }

  const code = `${group.code}-${String(nextNumber).padStart(3, '0')}`;

  const entity = this.strategyRepo.create({
    code,
    description,
    strategyGroup: group,
  });

  const saved = await this.strategyRepo.save(entity);

  // 🔥 MAP RESPONSE (สำคัญ)
  return {
    strategyGroup: {
      id: group.id,
      code: group.code,
      description: group.description,
    },
    id: saved.id,
    code: saved.code,
    description: saved.description,
    mst_strategy_group_id: saved.mst_strategy_group_id,
    is_active: saved.is_active,
  };
}

  async getStrategyGroups(): Promise<MstStrategyGroup[]> {
  return this.strategyGroupRepo.find({
    order: { id: 'ASC' },
  });
}
async getStrategies(): Promise<MstStrategy[]> {
  return this.strategyRepo.find({
    relations: ['strategyGroup'], // ⭐ สำคัญ
    order: { id: 'ASC' },
  });
}
async getStrategiesByGroupId(groupId: number): Promise<GetStrategyByGroupResponseDto> {
  const strategies = await this.strategyRepo.find({
    where: { mst_strategy_group_id: groupId },
    relations: ['strategyGroup'],
    order: { id: 'ASC' },
  });
/*
  if (!strategies.length) {
    return { strategyGroup: null };
  }*/

  const group = strategies[0].strategyGroup;

  return {
    strategyGroup: {
      id: group.id,
      code: group.code,
      description: group.description,
      strategies: strategies.map((s) => ({
        id: s.id,
        code: s.code,
        description: s.description,
        is_active: s.is_active,
      })),
    },
  };
}
}
