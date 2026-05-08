import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { KpiResultItemDto } from './kpi-result-item.dto';

export class KpiResultResponseDto extends PaginatedResponseDto<KpiResultItemDto> {}