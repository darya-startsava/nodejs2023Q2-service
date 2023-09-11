import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}
  use(req: Request, res: Response, next: NextFunction): void {
    res.on('finish', async () => {
      const { method, body, originalUrl, query } = req;
      const { statusCode } = res;
      await this.logger.log(
        `${method} ${originalUrl} ${statusCode}\nQuery params: ${JSON.stringify(
          query,
          null,
          2,
        )}\nRequest body: ${JSON.stringify(body, null, 2)}`,
      );
    });
    next?.();
  }
}
