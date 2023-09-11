import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwODEwNWNlYi0xODA5LTRjZDctOWQxZC1lM2ZkNWNhOGUzZDEiLCJ1c2VybmFtZSI6InN0cmluZyIsImlhdCI6MTY5MjY0ODU5NywiZXhwIjoxNjkyNjQ4NzE3fQ.y_kiKsrulM9zYkxzF78tra0EkzSVWj7dBar7He7gNCI',
  })
  accessToken: string;
}
