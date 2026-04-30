/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// common/interceptors/response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const message =
      this.reflector.get<string>('response_message', context.getHandler()) ||
      'Request success';

    return next.handle().pipe(
      map((data) => {
        let finalMessage = message;

        // ✅ handle empty array
        if (Array.isArray(data) && data.length === 0) {
          finalMessage = 'No data found';
        }

        return {
          success: true,
          message: finalMessage,
          data,
        };
      }),
    );
  }
}