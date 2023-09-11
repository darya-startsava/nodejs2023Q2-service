import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse {
  @ApiProperty({ example: 'b8260391-3910-40e1-af72-bf64c8d63f19' })
  id: string;
  @ApiProperty({ example: 'TestUser' })
  login: string;
  @ApiProperty({ example: 1 })
  version: number;
  @ApiProperty({ example: 1655000000 })
  createdAt: number;
  @ApiProperty({ example: 1655000000 })
  updatedAt: number;
  @Exclude()
  password: string;
  constructor(user: User) {
    Object.assign(this, user);
    this.createdAt = user.createdAt.valueOf();
    this.updatedAt = user.updatedAt.valueOf();
  }
}
