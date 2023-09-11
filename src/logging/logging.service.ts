import { Injectable } from '@nestjs/common';
import * as clc from 'cli-color';
import 'dotenv/config';
import { writeFile, mkdir, access, stat, rename } from 'node:fs/promises';

export enum LogLevel {
  debug = 0,
  log = 1,
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
    this.logLevel = Number.parseInt(process.env.LOG_LEVEL) || LogLevel.log;
    this.rotationSize = Number.parseInt(process.env.LOG_ROTATION_SIZE) || 10; // in KB
  }

  private async send(message: string, logLevel: LogLevel) {
    let colorize = clc.green;
    if (logLevel === LogLevel.warn) {
      colorize = clc.yellow;
    }
    if (logLevel === LogLevel.error) {
      colorize = clc.red;
    }
    const date = new Date();
    const output = `[${this.name}] - ${date.toLocaleDateString(
      'en-US',
    )} ${date.toLocaleTimeString('en-US')} - ${message
      .split('\n')
      .map((val) => colorize(val))
      .join('\n')}`;
    console.log(output);
    this.writeToFile(clc.strip(output) + '\n', date);
    if (logLevel === LogLevel.error) {
      this.writeToErrorFile(clc.strip(output) + '\n', date);
    }
  }

  private async writeToFile(message: string, date: Date) {
    try {
      await access('./logs');
    } catch (e) {
      await mkdir('./logs');
    }
    await writeFile('./logs/logs.txt', message, { flag: 'a' });
    const stats = await stat('./logs/logs.txt');
    const size = stats.size;
    if (size >= this.rotationSize * 1024) {
      try {
        await rename('./logs/logs.txt', `./logs/logs_${date.valueOf()}.txt`);
      } catch {}
    }
  }

  private async writeToErrorFile(message: string, date: Date) {
    try {
      await access('./logs');
    } catch (e) {
      await mkdir('./logs');
    }
    await writeFile('./logs/errors.txt', message, { flag: 'a' });
    const stats = await stat('./logs/errors.txt');
    const size = stats.size;
    if (size >= this.rotationSize * 1024) {
      try {
        await rename(
          './logs/errors.txt',
          `./logs/errors_${date.valueOf()}.txt`,
        );
      } catch {}
    }
  }

  async log(message: string) {
    if (this.logLevel <= LogLevel.log) {
      await this.send(message, LogLevel.log);
    }
  }

  async warn(message: string) {
    if (this.logLevel <= LogLevel.warn) {
      await this.send(message, LogLevel.warn);
    }
  }

  async error(message: string) {
    if (this.logLevel <= LogLevel.error) {
      await this.send(message, LogLevel.error);
    }
  }
}
