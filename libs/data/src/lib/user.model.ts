import { ApiProperty } from '@nestjs/swagger';

export class User {
  id?: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password?: string;

  loggedIn?: boolean;
}
