/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DbRetryHelper {
  private readonly logger = new Logger(DbRetryHelper.name);

  async onUnique<T>(
    fn: () => Promise<T>,
    maxRetry = 3,
  ): Promise<T> {
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetry; attempt++) {
      try {
        return await fn();
      } catch (err: any) {
        lastError = err;

        // PostgreSQL unique violation
        if (err.code === '23505') {
          this.logger.warn(
            `Duplicate detected (attempt ${attempt}/${maxRetry})`,
          );
          continue;
        }

        // error อื่น → ไม่ retry
        throw err;
      }
    }

    this.logger.error('Max retry reached for unique constraint');
    throw lastError;
  }
}