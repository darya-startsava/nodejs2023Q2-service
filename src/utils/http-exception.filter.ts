import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { LoggingService } from 'src/logging/logging.service';

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  private logger = new LoggingService();
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const { method, body, originalUrl, query } = request;
    this.logger.error(
      `${method} ${originalUrl} ${status}\nQuery params: ${JSON.stringify(
        query,
        null,
        2,
      )}\nRequest body: ${JSON.stringify(body, null, 2)}`,
    );
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
