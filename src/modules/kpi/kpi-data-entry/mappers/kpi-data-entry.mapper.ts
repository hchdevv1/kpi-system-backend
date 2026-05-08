import { KpiDataEntry } from '../entities/kpi-data-entry.entity';
import { KpiDataEntryResponseDto} from '../dto/create-kpi-data-entry-response.dto';

export class KpiDataEntryMapper {
  static toResponse(
    entity: KpiDataEntry,
  ): KpiDataEntryResponseDto {
    return {
      id: entity.id,

      kpiDefinitionId: entity.kpiDefinitionId,

      kpiDefYear: entity.kpiDefYear,
      kpiDefMonth: entity.kpiDefMonth,

      numeratorValue: entity.numeratorValue,
      denominatorValue: entity.denominatorValue,

      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
    };
  }

  static toResponseList(
    entities: KpiDataEntry[],
  ): KpiDataEntryResponseDto[] {
    return entities.map((e) => this.toResponse(e));
  }
}