// src/modules/kpi/kpi-directory/dto/update-kpi.dto.ts

import { PartialType } from '@nestjs/swagger';
import { CreateKpiDto } from './create-kpi.dto';

export class UpdateKpiDto extends PartialType(CreateKpiDto) {}