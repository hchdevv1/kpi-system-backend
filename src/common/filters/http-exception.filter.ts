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

      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse
      ) {
        message =
          (exceptionResponse as any).message ??
          'Internal server error';
      }
    }

    // =========================
    // POSTGRESQL ERROR
    // =========================
    else if (exception.code) {
      status = HttpStatus.BAD_REQUEST;

      switch (exception.code) {
        case DB_ERROR_CODE.UNIQUE_VIOLATION:
          message = 'Duplicate data';
          break;

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
    // UNKNOWN ERROR
    // =========================
    else {
      this.logger.error(exception);
    }

    response.status(status).json({
      success: false,
      message,
      data: null,
    });
  }
}