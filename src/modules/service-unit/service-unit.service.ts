
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MstServiceUnitGroup } from './entities/mst_serviceunit_group.entity';
import { MstServiceUnit } from './entities/mst_serviceunit.entity';
import { DbRetryHelper } from '../../common/helpers/db-retry.helper';
import { CodeGeneratorService } from '../../common/services/code-generator.service';

import { ServiceUnitGroupResponseDto } from './dto/service-unit-group-response.dto';
import { CreateServiceUnitGroupDto } from './dto/create-service-unit-group.dto';
import { UpdateServiceUnitGroupDto } from './dto/update-service-unit-group.dto';
import { ServiceUnitListResponseDto } from './dto/service-unit-list-response.dto';
import { CreateServiceUnitDto } from './dto/create-service-unit.dto';
import { UpdateServiceUnitDto } from './dto/update-service-unit.dto';

@Injectable()
export class ServiceUnitService {
  constructor(
    @InjectRepository(MstServiceUnitGroup)
    private readonly serviceUnitGroupRepo: Repository<MstServiceUnitGroup>,
    @InjectRepository(MstServiceUnit)
    private readonly serviceUnitRepo: Repository<MstServiceUnit>,
    private readonly dbRetryHelper: DbRetryHelper,
    private readonly codeGenerator: CodeGeneratorService,
  ) { }

  async createServiceUnitGroup(dto: CreateServiceUnitGroupDto): Promise<ServiceUnitGroupResponseDto> {
    const { description: descFromDto } = dto;
    return this.dbRetryHelper.onUnique(async () => {

      const lastRecord = await this.serviceUnitGroupRepo.find({
        order: { id: 'DESC' },
        take: 1,
      });
      const lastCode = lastRecord[0]?.code;
      const runningCode = this.codeGenerator.generateByType("SERVICEUNITGROUP", lastCode)
      const entity = this.serviceUnitGroupRepo.create({
        code: runningCode,
        description: descFromDto,
      })
      const saved = await this.serviceUnitGroupRepo.save(entity);
      return {
        id: saved.id,
        code: saved.code,
        description: saved.description,
      };
    });
  }


  async findAllServiceUnitGroup(): Promise<ServiceUnitGroupResponseDto[]> {
    const groups = await this.serviceUnitGroupRepo.find({
      order: { id: 'ASC' },
    });
    return groups.map((g) => ({
      id: g.id,
      code: g.code,
      description: g.description,
    }));
  }
  async updateServiceUnitGroup(
    xid: number, dto: UpdateServiceUnitGroupDto): Promise<ServiceUnitGroupResponseDto> {

    // 1. หา record
    const entity = await this.serviceUnitGroupRepo.findOne({
      where: { id: xid },
    });
    if (!entity) {
      throw new NotFoundException('service-unit group not found');
    }
    // 2. update field (เฉพาะที่ส่งมา)
    const { description } = dto;
    if (description !== undefined) {
      entity.description = description;
    }

    // 3. save
    const saved = await this.serviceUnitGroupRepo.save(entity);

    return {
      id: saved.id,
      code: saved.code,
      description: saved.description,
    };
  }

  async createServiceUnit(dto: CreateServiceUnitDto): Promise<ServiceUnitListResponseDto> {
    const { description, service_unit_group_id } = dto;
    return this.dbRetryHelper.onUnique(async () => {

      const lastRecord = await this.serviceUnitRepo.find({
        order: { id: 'DESC' },
        take: 1,
      });
      const lastCode = lastRecord[0]?.code;
      const runningCode = this.codeGenerator.generateByType("SERVICEUNIT", lastCode)
      const entity = this.serviceUnitRepo.create({
        code: runningCode,
        description,
        serviceUnitGroup: { id: service_unit_group_id }, // ✅ ใช้ relation object
      });
      const saved = await this.serviceUnitRepo.save(entity);
      const group = await this.serviceUnitGroupRepo.findOne({
        where: { id: service_unit_group_id },
        relations: ['serviceUnits'], // 👈 ชื่อ field ต้องตรง entity
      });
      if (!group) {
        throw new NotFoundException('Service unit group not found');
      }
      return {
        serviceunitGroup: {
          id: group.id,
          code: group.code,
          description: group.description,
          serviceunit: [
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

  /*
  async createServiceUnit(dto: CreateServiceUnitDto): Promise<ServiceUnitListResponseDto> {
    const { description, service_unit_group_id } = dto;
    return this.dbRetryHelper.onUnique(async () => {

      const lastRecord = await this.serviceUnitRepo.find({
        order: { id: 'DESC' },
        take: 1,
      });
      const lastCode = lastRecord[0]?.code;
      const runningCode = this.codeGenerator.generateByType("SERVICEUNIT", lastCode)
       const entity = this.serviceUnitRepo.create({
      code:runningCode,
      description,
      serviceUnitGroup: { id: service_unit_group_id }, // ✅ ใช้ relation object
    });
     
      const group = await this.serviceUnitGroupRepo.findOne({
        where: { id: service_unit_group_id },
        relations: ['serviceUnits'], // 👈 ชื่อ field ต้องตรง entity
      });
 if (!group) {
      throw new NotFoundException('Service unit group not found');
    }
     return {
      serviceunitGroup: {
        id: group.id,
        code: group.code,
        description: group.description,
        serviceunit: (group.serviceUnits ?? []).map((su) => ({
          id: su.id,
          code: su.code,
          description: su.description,
          is_active: su.is_active,
        })),
      },
    };
  });
  }
  */
  async getServiceUnitByGroupId(groupId: number): Promise<ServiceUnitListResponseDto> {

    const group = await this.serviceUnitGroupRepo.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('Organization group not found');
    }

    const serviceUnits = await this.serviceUnitRepo.find({
      where: { service_unit_group_id: groupId },
      relations: ['serviceUnitGroup'],
      order: { id: 'ASC' },
    });

    return {
      serviceunitGroup: {
        id: group.id,
        code: group.code,
        description: group.description,
        serviceunit: serviceUnits.map((s) => ({
          id: s.id,
          code: s.code,
          description: s.description,
          is_active: s.is_active,
        })),
      },
    };
  }
  async updateServiceUnit(
  xid: number,
  dto: UpdateServiceUnitDto,
): Promise<ServiceUnitListResponseDto> {

  // 1. หา record + relation
  const entity = await this.serviceUnitRepo.findOne({
    where: { id: xid },
    relations: ['serviceUnitGroup'],
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
  const saved = await this.serviceUnitRepo.save(entity);

  // 4. หา group
  const groupId = entity.serviceUnitGroup?.id;

  const group = await this.serviceUnitGroupRepo.findOne({
    where: { id: groupId },
  });

  if (!group) {
    throw new NotFoundException('Service unit group not found');
  }

  // 5. return เฉพาะตัวที่ update
  return {
    serviceunitGroup: {
      id: group.id,
      code: group.code,
      description: group.description,
      serviceunit: [
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
