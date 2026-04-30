import { Module } from '@nestjs/common';
import { KpiDirectoryService } from './kpi-directory.service';
import { KpiDirectoryController } from './kpi-directory.controller';

@Module({
  controllers: [KpiDirectoryController],
  providers: [KpiDirectoryService],
})
export class KpiDirectoryModule {}
