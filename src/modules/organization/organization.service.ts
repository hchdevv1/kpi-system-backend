import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MstOrganization } from './entities/mst_organization.entity';
import { MstOrganizationGroup } from './entities/mst_organization_group.entity';

import { DbRetryHelper } from '../../common/helpers/db-retry.helper';
import { CodeGeneratorService } from '../../common/services/code-generator.service';

import { OrganizationGroupResponseDto } from './dto/organization-group-response.dto';
import { CreateOrganizationGroupDto } from './dto/create-organization-group.dto';
import { UpdateorganzationGroupDto } from './dto/update-organzation-group.dto';

import { OrganzationListResponseDto } from './dto/organzation-list-response.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organzation.dto';

import { validateRefExists } from '../../common/helpers/validate-ref.helper';
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


  async findAllOrganzationGroup(): Promise<OrganizationGroupResponseDto[]> {
    const groups = await this.organizationGroupRepo.find({
      order: { id: 'ASC' },
    });
    return groups.map((g) => ({
      id: g.id,
      code: g.code,
      description: g.description,
    }));
  }
  async createStrategyGroup(dto: CreateOrganizationGroupDto): Promise<OrganizationGroupResponseDto> {
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
    xid: number, dto: UpdateorganzationGroupDto): Promise<OrganizationGroupResponseDto> {
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

  async createOrganzation(dto: CreateOrganizationDto): Promise<OrganzationListResponseDto> {

    const { description, mst_organization_group_id } = dto;
    return this.dbRetryHelper.onUnique(async () => {
      await validateRefExists(
        this.organizationRepo.manager,
        MstOrganizationGroup,
        mst_organization_group_id,
        'Organization group',
      );

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
      const group = await this.organizationGroupRepo.findOneOrFail({
        where: { id: mst_organization_group_id },
      });
       

      return {
        kpiOrganizationGroup: {
          id: group.id,
          code: group.code,
          description: group.description,
          kpiOrganizations: [
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

  async getOrganzationGroupId(groupId: number): Promise<OrganzationListResponseDto> {

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
      kpiOrganizationGroup: {
        id: group.id,
        code: group.code,
        description: group.description,
        kpiOrganizations: kpisimple.map((s) => ({
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
    dto: UpdateOrganizationDto,
  ): Promise<OrganzationListResponseDto> {
    // 1. หา record + relation
    const entity = await this.organizationRepo.findOne({
      where: { id: xid },
      relations: ['organizationGroup'],
    });

  if (!entity) {
    throw new NotFoundException(
      `KPI Organization (${xid}) not found`,
    );
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

   
    // 5. return เฉพาะตัวที่ update
    return {
      kpiOrganizationGroup: {
        id: entity.organizationGroup.id,
        code: entity.organizationGroup.code,
        description: entity.organizationGroup.description,
        kpiOrganizations: [
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