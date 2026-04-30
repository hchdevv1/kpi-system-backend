import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MstOrganization } from './entities/mst_organization.entity';
import { MstOrganizationGroup } from './entities/mst_organization_group.entity';

import { DbRetryHelper } from '../../common/helpers/db-retry.helper';
import { CodeGeneratorService } from '../../common/services/code-generator.service';

import { XOrganizationGroupResponseDto } from './dto/y-organization-group-response.dto';
import { XCreateOrganizationGroupDto } from './dto/y-create-organization-group.dto';
import {XUpdateorganzationGroupDto } from './dto/y-update-organzation-group.dto';

import { XOrganzationListResponseDto } from './dto/y-organzation-list-response.dto';
import { XCreateOrganizationDto} from './dto/y-create-organization.dto';
import { XUpdateOrganizationDto } from './dto/y-update-organzation.dto';

/*import { CreateOrganizationResponseDto } from './dto/organization-create-response.dto';
import { GetOrganizationGroupResponseDto } from './dto/organization-group-response.dto';
import { OrganizationGroupDto } from './dto/organization-group.dto';


import { XCreateOrganizationGroupDto } from './dto/1create-organization-group.dto';
import { XOrganizationGroupDto } from './dto/1organization-group.dto'
import { XUpdateOrganizationGroupDto} from './dto/1update-organization-group.dto';
*/

@Injectable()
export class OrganizationService {
  constructor(

    @InjectRepository(MstOrganization)
    private readonly organizationRepo: Repository<MstOrganization>,
    @InjectRepository(MstOrganizationGroup)
    private readonly organizationGroupRepo: Repository<MstOrganizationGroup>,
    private readonly dbRetryHelper: DbRetryHelper,
    private readonly codeGenerator: CodeGeneratorService,


  ) { }


  async findAllOrganzationGroup(): Promise<XOrganizationGroupResponseDto[]> {
    const groups = await this.organizationGroupRepo.find({
      order: { id: 'ASC' },
    });
    return groups.map((g) => ({
      id: g.id,
      code: g.code,
      description: g.description,
    }));
  }
  async createStrategyGroup(dto: XCreateOrganizationGroupDto): Promise<XOrganizationGroupResponseDto> {
    const { description: descFromDto } = dto;
    return this.dbRetryHelper.onUnique(async () => {

      const lastRecord = await this.organizationGroupRepo.find({
        order: { id: 'DESC' },
        take: 1,
      });
      const lastCode = lastRecord[0]?.code;
      const runningCode = this.codeGenerator.generateByType("ORGANGROUP", lastCode)
      const entity = this.organizationGroupRepo.create({
        code: runningCode,
        description: descFromDto,
      })
      const saved = await this.organizationGroupRepo.save(entity);
      return {
        id: saved.id,
        code: saved.code,
        description: saved.description,
      };
    });
  }

 async updateOrganzationGroup(
    xid: number, dto: XUpdateorganzationGroupDto): Promise<XOrganizationGroupResponseDto> {
    const entity = await this.organizationGroupRepo.findOne({
      where: { id: xid },
    });
    if (!entity) {
      throw new NotFoundException('Organzation group not found');
    }
    const { description } = dto;
    if (description !== undefined) {
      entity.description = description;
    }
    // 3. save
    const saved = await this.organizationGroupRepo.save(entity);
    return {
      id: saved.id,
      code: saved.code,
      description: saved.description,
    };
  }

async createOrganzation(dto: XCreateOrganizationDto): Promise<XOrganzationListResponseDto> {
      const { description, mst_organization_group_id } = dto;
      return this.dbRetryHelper.onUnique(async () => {
  
        const lastRecord = await this.organizationRepo.find({
          order: { id: 'DESC' },
          take: 1,
        });
        const lastCode = lastRecord[0]?.code;
        const runningCode = this.codeGenerator.generateByType("ORGAN", lastCode)
        const entity = this.organizationRepo.create({
          code: runningCode,
          description,
          mst_organization_group_id: mst_organization_group_id,
        });
        const saved = await this.organizationRepo.save(entity);
        const group = await this.organizationGroupRepo.findOne({
          where: { id: mst_organization_group_id },
        });
        if (!group) {
          throw new NotFoundException('Organization group not found');
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

 async getOrganzationGroupId(groupId: number): Promise<XOrganzationListResponseDto> {

    const group = await this.organizationGroupRepo.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('kpi simple group not found');
    }

    const kpisimple = await this.organizationRepo.find({
      where: { mst_organization_group_id: groupId },
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
async updateOrganization(
    xid: number,
    dto: XUpdateOrganizationDto,
  ): Promise<XOrganzationListResponseDto> {
    // 1. หา record + relation
    const entity = await this.organizationRepo.findOne({
      where: { id: xid },
      relations: ['organizationGroup'],
    });

    if (!entity) {
      throw new NotFoundException('Organization not found');
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
    const saved = await this.organizationRepo.save(entity);

    // 4. หา group

    const group = await this.organizationGroupRepo.findOne({
      where: { id: entity.mst_organization_group_id },
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

} /*
  async createOrganization(
    description: string,
    groupId: number,
  ): Promise<CreateOrganizationResponseDto> {
    const group = await this.organizationGroupRepo.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('Organization group not found');
    }

    const lastOrganization = await this.organizationRepo
      .createQueryBuilder('s')
      .where('s.mst_organization_group_id = :groupId', { groupId })
      .orderBy('s.id', 'DESC')
      .getOne();

    let nextNumber = 1;

    if (lastOrganization?.code) {
      const parts = lastOrganization.code.split('-');
      nextNumber = parseInt(parts[1] || '0', 10) + 1;
    }

    const code = `${group.code}-${String(nextNumber).padStart(3, '0')}`;

    const entity = this.organizationRepo.create({
      code,
      description,
      organizationGroup: group,
    });

    const saved = await this.organizationRepo.save(entity);

    return {
      OrganizationGroup: {
        id: group.id,
        code: group.code,
        description: group.description,
      },
      id: saved.id,
      code: saved.code,
      description: saved.description,
      mst_organization_group_id: saved.mst_organization_group_id,
      is_active: saved.is_active,

    };
  }


  async createOrganizationGroup(dto:XCreateOrganizationGroupDto,):Promise<XOrganizationGroupDto> {
    const {code,description} = dto;
    const exists = await this.organizationGroupRepo.findOne({
      where: { code },
    });

    if (exists) {
      throw new BadRequestException('Organization group code already exists');
    }

    const entity = this.organizationGroupRepo.create({
      code,
      description,
    });
    const saved =await this.organizationGroupRepo.save(entity);

    return{
      id: saved.id,
      code :saved.code,
      description :saved.description,
    };
  }

  async editOrganizationGroup(
  id: number,
  dto: XUpdateOrganizationGroupDto,
): Promise<XOrganizationGroupDto> {
  const entity = await this.organizationGroupRepo.findOne({
    where: { id },
  });

  if (!entity) {
    throw new NotFoundException('Organization group not found');
  }

  // 🔥 ถ้ามีการแก้ code → check duplicate
  if (dto.code && dto.code !== entity.code) {
    const exists = await this.organizationGroupRepo.findOne({
      where: { code: dto.code },
    });

    if (exists) {
      throw new BadRequestException('Organization group code already exists');
    }
  }

  // 🔥 merge ค่าใหม่
  Object.assign(entity, dto);

  const saved = await this.organizationGroupRepo.save(entity);

  return {
    id: saved.id,
    code: saved.code,
    description: saved.description,
  };
}

  async getOrganizationGroups(): Promise<OrganizationGroupDto[]> {
    const groups = await this.organizationGroupRepo.find({
      order: { id: 'ASC' },
    });
    return groups.map((g) => ({
      id: g.id,
      code: g.code,
      description: g.description,
    }));
  }
  async getOrganization(): Promise<GetOrganizationGroupResponseDto[]> {
    return this.organizationRepo.find({
      relations: ['organizationGroup'],
      order: { id: 'ASC' },
    });
  }

  async getOrganizationByGroupId(groupId: number): Promise<GetOrganizationGroupResponseDto> {

    const group = await this.organizationGroupRepo.findOne({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('Organization group not found');
    }

    const organizations = await this.organizationRepo.find({
      where: { mst_organization_group_id: groupId },
      relations: ['organizationGroup'],
      order: { id: 'ASC' },
    });

    return {
      organizationGroup: {
        id: group.id,
        code: group.code,
        description: group.description,
        organizations: organizations.map((s) => ({
          id: s.id,
          code: s.code,
          description: s.description,
          is_active: s.is_active,
        })),
      },
    };
  }
}
*/
