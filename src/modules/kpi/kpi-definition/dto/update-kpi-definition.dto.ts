import { PartialType } from '@nestjs/swagger';
import { CreateKpiDefinitionDto } from './create-kpi-definition.dto';

export class UpdateKpiDefinitionDto extends PartialType(
  CreateKpiDefinitionDto,
) {}