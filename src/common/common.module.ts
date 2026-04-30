import { Module } from '@nestjs/common';
import { DbRetryHelper } from './helpers/db-retry.helper';
import { CodeGeneratorService } from './services/code-generator.service';

@Module({
  providers: [
    DbRetryHelper,
    CodeGeneratorService,
  ],
  exports: [
    DbRetryHelper,
    CodeGeneratorService,
  ],
})
export class CommonModule {}