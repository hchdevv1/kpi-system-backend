
import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, SelectQueryBuilder } from 'typeorm';

import { KpiDefinition } from '../kpi-definition/entities/kpi-definition.entity';
import { KpiDataEntry } from '../kpi-data-entry/entities/kpi-data-entry.entity';
import { KpiCalculationService } from '../kpi-result/services/kpi-calculation.service';

import {
  KpiSummaryRequestDto,
  KpiSummaryTab,
} from './dto/kpi-summary-request.dto';

import {
  KpiSummaryMasterDto,
  KpiSummaryOwnerDto,
  KpiSummaryResponseDto,
  KpiSummaryResponseItemDto,
} from './dto/kpi-summary-response.dto';

@Injectable()
export class KpiSummaryService {
  constructor(
    private readonly calc: KpiCalculationService,

    @InjectRepository(KpiDefinition)
    private readonly kpiDefinitionRepository: Repository<KpiDefinition>,

    @InjectRepository(KpiDataEntry)
    private readonly kpiDataEntryRepository: Repository<KpiDataEntry>,
  ) {}

  // =====================================================
  // FIND SUMMARY
  // =====================================================
  async findSummary(
    request: KpiSummaryRequestDto,
  ): Promise<KpiSummaryResponseDto> {
    this.validateRequest(request);

    const page = 1;
    const limit = 10;

    const query = this.kpiDefinitionRepository
      .createQueryBuilder('kpi')

      // KPI INFORMATION
      .leftJoinAndSelect('kpi.topic', 'topic')
      .leftJoinAndSelect('kpi.frequency', 'frequency')
      .leftJoinAndSelect('kpi.benchmark', 'benchmark')
      .leftJoinAndSelect('kpi.unit', 'unit')

      // STRATEGY
      .leftJoinAndSelect('kpi.kpiStrategies', 'strategyMapping')
      .leftJoinAndSelect('strategyMapping.strategy', 'strategy')
      .leftJoinAndSelect('strategy.strategyGroup', 'strategyGroup')

      // ORGANIZATION MAIN
      .leftJoinAndSelect(
        'kpi.kpiOrganizations',
        'organizationMapping',
      )
      .leftJoinAndSelect(
        'organizationMapping.organization',
        'organization',
      )
      .leftJoinAndSelect(
        'organization.organizationGroup',
        'organizationGroup',
      )

      // ORGANIZATION SUB
      .leftJoinAndSelect(
        'kpi.kpiOrganizations',
        'organizationSubMapping',
      )
      .leftJoinAndSelect(
        'organizationSubMapping.organization',
        'organizationSub',
      )
      .leftJoinAndSelect(
        'organizationSub.organizationGroup',
        'organizationSubGroup',
      )

      // SIMPLE
      .leftJoinAndSelect('kpi.kpiSimples', 'simpleMapping')
      .leftJoinAndSelect('simpleMapping.simple', 'simple')
      .leftJoinAndSelect('simple.kpisimplegroup', 'simpleGroup')

      // SERVICE UNIT
      .leftJoinAndSelect('kpi.kpiServiceUnits', 'serviceUnitMapping')
      .leftJoinAndSelect(
        'serviceUnitMapping.serviceUnit',
        'serviceUnit',
      )
      .leftJoinAndSelect(
        'serviceUnit.serviceUnitGroup',
        'serviceUnitGroup',
      )

      // OWNER
      .leftJoinAndSelect('kpi.userRoles', 'userRoleMapping')
      .leftJoinAndSelect('userRoleMapping.user', 'ownerUser')
      .leftJoinAndSelect('userRoleMapping.role', 'ownerRole')

      .where('kpi.kpi_year = :year', {
        year: request.year,
      })
      .andWhere('kpi.is_active = :isActive', {
        isActive: true,
      })
      .andWhere('kpi.deleted_at IS NULL');

    // KPI SEARCH
    if (request.kpiSearch?.trim()) {
      query.andWhere('topic.description ILIKE :kpiSearch', {
        kpiSearch: `%${request.kpiSearch.trim()}%`,
      });
    }

    // TAB FILTER
    this.applyTabFilter(query, request);

    // EXECUTE QUERY
    const [entities, total] = await query
      .distinct(true)
      .orderBy('kpi.id', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    // =====================================================
    // LOAD KPI DATA ENTRY
    // =====================================================
    const kpiIds = entities.map((entity) => entity.id);

    const entries =
      kpiIds.length > 0
        ? await this.kpiDataEntryRepository.find({
            where: {
              kpiDefinitionId: In(kpiIds),
              kpiDefYear: request.year,
            },
            order: {
              kpiDefMonth: 'ASC',
            },
          })
        : [];

    // =====================================================
    // GROUP DATA ENTRY BY KPI ID
    // =====================================================
    const entryMap = new Map<number, KpiDataEntry[]>();

    for (const entry of entries) {
      const currentEntries =
        entryMap.get(entry.kpiDefinitionId) ?? [];

      currentEntries.push(entry);

      entryMap.set(entry.kpiDefinitionId, currentEntries);
    }

    // =====================================================
    // BUILD RESPONSE
    // =====================================================
    const items = entities.map((entity) =>
      this.mapResponse(
        entity,
        request,
        entryMap.get(entity.id) ?? [],
      ),
    );

    return {
      items,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  // =====================================================
  // VALIDATE REQUEST
  // =====================================================
  private validateRequest(request: KpiSummaryRequestDto): void {
    const requiredFields: Partial<
      Record<KpiSummaryTab, string[]>
    > = {
      [KpiSummaryTab.STRATEGY]: [
        'strategyId',
        'strategyObjectId',
      ],
      [KpiSummaryTab.ORGANIZATION]: [
        'organizationId',
        'organizationSubId',
      ],
      [KpiSummaryTab.SIMPLE]: [
        'simpleGroupId',
        'simpleId',
      ],
      [KpiSummaryTab.PCT]: ['serviceUnitId'],
      [KpiSummaryTab.COE]: ['serviceUnitId'],
      [KpiSummaryTab.LOCATION]: ['serviceUnitId'],
    };

    for (const field of requiredFields[request.tab] ?? []) {
      if (
        (request as unknown as Record<string, unknown>)[field] ===
        undefined
      ) {
        throw new BadRequestException(
          `Field "${field}" is required for tab "${request.tab}"`,
        );
      }
    }
  }

  // =====================================================
  // APPLY TAB FILTER
  // =====================================================
  private applyTabFilter(
    query: SelectQueryBuilder<KpiDefinition>,
    request: KpiSummaryRequestDto,
  ): void {
    switch (request.tab) {
      // -------------------------------------------------
      // STRATEGY
      // -------------------------------------------------
      case KpiSummaryTab.STRATEGY:
        // Filter Strategy
        query.andWhere(
          `EXISTS (
            SELECT 1
            FROM kpi_strategy_mappings filterMapping
            INNER JOIN mst_strategy filterStrategy
              ON filterStrategy.id = filterMapping.strategy_id
            INNER JOIN mst_strategy_group filterGroup
              ON filterGroup.id = filterStrategy.mst_strategy_group_id
            WHERE filterMapping.kpi_id = kpi.id
              AND filterStrategy.id = :strategyId
              AND filterGroup.description = :strategyGroupName
          )`,
          {
            strategyId: request.strategyId,
            strategyGroupName: 'Strategy',
          },
        );

        // Filter Strategy Object
        query.andWhere(
          `EXISTS (
            SELECT 1
            FROM kpi_strategy_mappings filterMapping
            INNER JOIN mst_strategy filterStrategy
              ON filterStrategy.id = filterMapping.strategy_id
            INNER JOIN mst_strategy_group filterGroup
              ON filterGroup.id = filterStrategy.mst_strategy_group_id
            WHERE filterMapping.kpi_id = kpi.id
              AND filterStrategy.id = :strategyObjectId
              AND filterGroup.description = :strategyObjectGroupName
          )`,
          {
            strategyObjectId: request.strategyObjectId,
            strategyObjectGroupName: 'Strategy Object',
          },
        );
        break;

      // -------------------------------------------------
      // ORGANIZATION
      // -------------------------------------------------
      case KpiSummaryTab.ORGANIZATION:
        query
          .andWhere('organizationGroup.id = :organizationMainGroupId', {
            organizationMainGroupId: 1,
          })
          .andWhere('organization.id = :organizationId', {
            organizationId: request.organizationId,
          });

        query.andWhere(
          `EXISTS (
            SELECT 1
            FROM kpi_organization_mappings filterMapping
            INNER JOIN mst_organization filterOrganization
              ON filterOrganization.id = filterMapping.organization_id
            INNER JOIN mst_organization_group filterGroup
              ON filterGroup.id =
                filterOrganization.mst_organization_group_id
            WHERE filterMapping.kpi_id = kpi.id
              AND filterOrganization.id = :organizationSubId
              AND filterGroup.id = :organizationSubGroupId
          )`,
          {
            organizationSubId: request.organizationSubId,
            organizationSubGroupId: 2,
          },
        );
        break;

      // -------------------------------------------------
      // SIMPLE
      // -------------------------------------------------
      case KpiSummaryTab.SIMPLE:
        query
          .andWhere('simpleGroup.id = :simpleGroupId', {
            simpleGroupId: request.simpleGroupId,
          })
          .andWhere('simple.id = :simpleId', {
            simpleId: request.simpleId,
          });
        break;

      // -------------------------------------------------
      // PCT / COE / LOCATION
      // -------------------------------------------------
      case KpiSummaryTab.PCT:
      case KpiSummaryTab.COE:
      case KpiSummaryTab.LOCATION: {
        const groupCode: Record<string, string> = {
          [KpiSummaryTab.PCT]: 'SG001',
          [KpiSummaryTab.COE]: 'SG002',
          [KpiSummaryTab.LOCATION]: 'SG003',
        };

        query
          .andWhere('serviceUnitGroup.code = :serviceGroupCode', {
            serviceGroupCode: groupCode[request.tab],
          })
          .andWhere('serviceUnit.id = :serviceUnitId', {
            serviceUnitId: request.serviceUnitId,
          });

        break;
      }
    }
  }

  // =====================================================
  // MAP MASTER
  // =====================================================
  private mapMaster(
    value:
      | {
          id: number;
          code?: string | null;
          description: string;
        }
      | null
      | undefined,
  ): KpiSummaryMasterDto | null {
    if (!value) {
      return null;
    }

    return {
      id: value.id,
      code: value.code ?? null,
      description: value.description,
    };
  }

  // =====================================================
  // ROUND RESULT
  // =====================================================
  private roundResult(value: number): number {
    return Math.round(value * 100) / 100;
  }

  // =====================================================
  // CALCULATE AGGREGATE
  // =====================================================
  private calculateAggregate(
    entries: KpiDataEntry[],
    entity: KpiDefinition,
  ): number | null {
    if (entries.length === 0 || !entity.unit) {
      return null;
    }

    const value = this.calc.calculateYearlyAggregate(
      entries,
      entity.unit,
    );

    return this.roundResult(value);
  }

  // =====================================================
  // MAP RESPONSE
  // =====================================================
  private mapResponse(
    entity: KpiDefinition,
    request: KpiSummaryRequestDto,
    entries: KpiDataEntry[],
  ): KpiSummaryResponseItemDto {
    const { year, tab } = request;

    const strategyMappings = entity.kpiStrategies ?? [];
    const organizationMappings = entity.kpiOrganizations ?? [];
    const simpleMappings = entity.kpiSimples ?? [];
    const serviceUnitMappings = entity.kpiServiceUnits ?? [];
    const userRoleMappings = entity.userRoles ?? [];

    // STRATEGY
    const strategy =
      strategyMappings.find(
        (mapping) =>
          mapping.strategy?.strategyGroup?.description === 'Strategy',
      )?.strategy ?? null;

    const strategyObject =
      strategyMappings.find(
        (mapping) =>
          mapping.strategy?.strategyGroup?.description ===
          'Strategy Object',
      )?.strategy ?? null;

    const goal =
      strategyMappings.find(
        (mapping) =>
          mapping.strategy?.strategyGroup?.description === 'Goal',
      )?.strategy ?? null;

    // ORGANIZATION
    const organization =
      organizationMappings.find(
        (mapping) =>
          mapping.organization?.organizationGroup?.id === 1,
      )?.organization ?? null;

    const organizationSub =
      organizationMappings.find(
        (mapping) =>
          mapping.organization?.organizationGroup?.id === 2,
      )?.organization ?? null;

    // SIMPLE
    const simple = simpleMappings.find(
      (mapping) => mapping.simple?.id != null,
    )?.simple;

    // SERVICE UNIT
    const serviceGroupCode: Partial<Record<KpiSummaryTab, string>> = {
      [KpiSummaryTab.PCT]: 'SG001',
      [KpiSummaryTab.COE]: 'SG002',
      [KpiSummaryTab.LOCATION]: 'SG003',
    };

    const serviceUnit =
      [
        KpiSummaryTab.PCT,
        KpiSummaryTab.COE,
        KpiSummaryTab.LOCATION,
      ].includes(tab)
        ? serviceUnitMappings.find(
            (mapping) =>
              mapping.serviceUnit?.id === request.serviceUnitId &&
              mapping.serviceUnit?.serviceUnitGroup?.code ===
                serviceGroupCode[tab],
          )?.serviceUnit ?? null
        : null;

    // OWNER
    const owners: KpiSummaryOwnerDto[] = userRoleMappings
      .filter(
        (mapping) =>
          mapping.role?.description?.toLowerCase() === 'owner' &&
          mapping.user,
      )
      .map((mapping) => ({
        id: mapping.user.id,
        usercode: mapping.user.usercode,
        description: mapping.user.description,
      }));

    // ===================================================
    // MONTHLY RESULTS
    // ===================================================
    const monthlyResults = Array.from(
      { length: 12 },
      (_, index) => {
        const month = index + 1;

        const entry = entries.find(
          (item) => item.kpiDefMonth === month,
        );

        if (!entry || !entity.unit) {
          return {
            month,
            result: null,
          };
        }

        const value = this.calc.calculateValue(
          entry,
          entity.unit,
        );

        return {
          month,
          result: this.roundResult(value),
        };
      },
    );

    // ===================================================
    // QUARTERLY RESULTS
    // ===================================================
    const quarterlyResults = Array.from(
      { length: 4 },
      (_, index) => {
        const quarter = index + 1;

        const startMonth = (quarter - 1) * 3 + 1;
        const endMonth = startMonth + 2;

        const quarterEntries = entries.filter(
          (entry) =>
            entry.kpiDefMonth >= startMonth &&
            entry.kpiDefMonth <= endMonth,
        );

        return {
          quarter,
          result: this.calculateAggregate(
            quarterEntries,
            entity,
          ),
        };
      },
    );

    // ===================================================
    // HALF YEAR RESULT (JAN - JUN)
    // ===================================================
    const halfYearEntries = entries.filter(
      (entry) =>
        entry.kpiDefMonth >= 1 &&
        entry.kpiDefMonth <= 6,
    );

    const halfYearResult = this.calculateAggregate(
      halfYearEntries,
      entity,
    );

    // ===================================================
    // TOTAL RESULT (JAN - DEC)
    // ===================================================
    const totalResult = this.calculateAggregate(
      entries,
      entity,
    );

    // ===================================================
    // BUILD RESPONSE
    // ===================================================
    const result: KpiSummaryResponseItemDto = {
      id: entity.id,
      kpi: {
        id: entity.topic.id,
        code: entity.topic.code,
        description: entity.topic.description,
      },
      year: entity.kpi_year,
      frequency: entity.frequency?.description ?? null,
      benchmark:
        entity.benchmark_target_value ??
        entity.benchmark?.description ??
        null,
      target: entity.targetValue ?? null,
      owner: owners,

      previousYear: {
        year: year - 1,
        result: entity.previousYearValue ?? null,
      },

      monthlyResults,
      quarterlyResults,
      halfYearResult,
      totalResult,
    };

    // ===================================================
    // TAB RESPONSE
    // ===================================================
    switch (tab) {
      case KpiSummaryTab.STRATEGY:
        result.strategy = this.mapMaster(strategy);
        result.strategyObject = this.mapMaster(strategyObject);
        result.goal = this.mapMaster(goal);
        break;

      case KpiSummaryTab.ORGANIZATION:
        result.organization = this.mapMaster(organization);
        result.organizationSub = this.mapMaster(organizationSub);
        break;

      case KpiSummaryTab.SIMPLE:
        result.simpleGroup = this.mapMaster(simple?.kpisimplegroup);
        result.simpleSubGroup = this.mapMaster(simple);
        break;

      case KpiSummaryTab.PCT:
      case KpiSummaryTab.COE:
      case KpiSummaryTab.LOCATION:
        result.serviceUnitGroup = this.mapMaster(
          serviceUnit?.serviceUnitGroup,
        );
        result.serviceUnit = this.mapMaster(serviceUnit);
        break;
    }

    return result;
  }
}
