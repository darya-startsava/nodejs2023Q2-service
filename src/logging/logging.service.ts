import { Injectable } from '@nestjs/common';
import * as clc from 'cli-color';
import 'dotenv/config';

export enum LogLevel {
  info = 1,
  warn = 2,
  error = 3,
}

@Injectable()
export class LoggingService {
  private name: string;
  private logLevel: LogLevel;
  private rotationSize: number;

  constructor() {
    this.name = 'Custom Logger';
    this.logLevel = Number.parseInt(process.env.LOG_LEVEL) || LogLevel.info;
    this.rotationSize = Number.parseInt(process.env.LOG_ROTATION_SIZE) || 10; // in KB
  }

  private log(message: string, logLevel: LogLevel) {
    let colorize = clc.green;
    if (logLevel === LogLevel.warn) {
      colorize = clc.yellow;
    }
    if (logLevel === LogLevel.error) {
      colorize = clc.red;
    }
    const date = new Date();
    console.log(
      `[${this.name}] - ${date.toLocaleDateString(
        'en-US',
      )} ${date.toLocaleTimeString('en-US')} - ${message
        .split('\n')
        .map((val) => colorize(val))
        .join('\n')}`,
    );
  }

  info(message: string) {
    if (this.logLevel <= LogLevel.info) {
      this.log(message, LogLevel.info);
    }
  }

  warn(message: string) {
    if (this.logLevel <= LogLevel.warn) {
      this.log(message, LogLevel.warn);
    }
  }

  error(message: string) {
    if (this.logLevel <= LogLevel.error) {
      this.log(message, LogLevel.error);
    }
  }
}
