import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MstConditionOperator } from './entities/mst_condition_operator.entity';
import { DbRetryHelper } from '../../common/helpers/db-retry.helper';
import { CodeGeneratorService } from '../../common/services/code-generator.service';

import { ConditionOperatorResponseDto } from './dto/condition-operator-response.dto';
import { CreateConditionOperatorDto } from './dto/create-condition-operator.dto';
import {UpdateConditionOperatorDto} from './dto/update-condition-operator.dto';

@Injectable()
export class ConditionOperatorService {
  constructor(
    @InjectRepository(MstConditionOperator)
    private readonly conditionoperatorRepo: Repository<MstConditionOperator>,
    private readonly dbRetryHelper: DbRetryHelper,
    private readonly codeGenerator: CodeGeneratorService,
  ) { }

  async createConditionOperator(dto: CreateConditionOperatorDto): Promise<ConditionOperatorResponseDto> {
    const { description: descFromDto } = dto;  
    const { symbol: symbolFromDto } = dto;
    return this.dbRetryHelper.onUnique(async () => {

      const lastRecord = await this.conditionoperatorRepo.find({
        order: { id: 'DESC' },
        take: 1,
      });
      const lastCode = lastRecord[0]?.code;
      const runningCode = this.codeGenerator.generateByType("CONDITIONOPERATOR", lastCode)
      const entity = this.conditionoperatorRepo.create({
        code: runningCode,
        description: descFromDto,
        symbol: symbolFromDto
      })
      const saved = await this.conditionoperatorRepo.save(entity);
      return {
        id: saved.id,
        code: saved.code,
        description: saved.description,
        is_active: saved.is_active,
        symbol:saved.symbol
      };
    });
  }

  async findAll(): Promise<ConditionOperatorResponseDto[]> {
    const groups = await this.conditionoperatorRepo.find({
      order: { id: 'ASC' },
    });
    return groups.map((g) => ({
      id: g.id,
      code: g.code,
      description: g.description,
      symbol: g.symbol,
      is_active: g.is_active,

    }));
  }

   async updateConditionOperator(
      xid: number, dto: UpdateConditionOperatorDto): Promise<ConditionOperatorResponseDto> {
  
      // 1. หา record
      const entity = await this.conditionoperatorRepo.findOne({
        where: { id: xid },
      });
      if (!entity) {
        throw new NotFoundException('condition-operator not found');
      }
      // 2. update field (เฉพาะที่ส่งมา)
      const { description, is_active,symbol } = dto;
      if (description !== undefined) {
        entity.description = description;
      }
       if (symbol !== undefined) {
        entity.symbol = symbol;
      }
      if (typeof is_active === 'boolean') {
        entity.is_active = is_active;
      }
      // 3. save
      const saved = await this.conditionoperatorRepo.save(entity);
  
      return {
        id: saved.id,
        code: saved.code,
        description: saved.description,
        symbol:saved.symbol,
        is_active: saved.is_active
      };
    }

}
