/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { DB_ERROR_CODE } from '../constants/db-error-code.constant';
import { DB_UNIQUE_ERRORS } from '../constants/db-error-map';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    // =========================
    // HTTP EXCEPTION
    // =========================
    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res) {
        message = (res as any).message ?? message;
      }
    }

    // =========================
    // POSTGRES ERROR
    // =========================
    else if (exception?.code) {
      status = HttpStatus.BAD_REQUEST;

      switch (exception.code) {
        case DB_ERROR_CODE.UNIQUE_VIOLATION: {
          const constraint = exception.constraint;
          status = HttpStatus.CONFLICT;
          message =
            DB_UNIQUE_ERRORS[constraint] ??
            'Duplicate data';

          break;
        }

        case DB_ERROR_CODE.FOREIGN_KEY_VIOLATION:
          message = 'Reference data not found';
          break;

        case DB_ERROR_CODE.NOT_NULL_VIOLATION:
          message = 'Required field missing';
          break;

        default:
          message =
            process.env.NODE_ENV === 'development'
              ? exception.detail || exception.message
              : 'Database error';
      }
    }

    // =========================
    // LOG (CLEANER)
    // =========================
    if (status === 500) {
      this.logger.error(
        {
          message: exception?.message,
          code: exception?.code,
          constraint: exception?.constraint,
          detail: exception?.detail,
          stack: exception?.stack,
        },
      );
    } else {
      this.logger.warn({
        message,
        code: exception?.code,
        constraint: exception?.constraint,
      });
    }

    // =========================
    // RESPONSE
    // =========================
    response.status(status).json({
      success: false,
      message,
      data: null,
    });
  }
}