import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Todo {
  @ApiPropertyOptional({ description: 'Unique Id of stored todo' })
  id?: string;

  @ApiProperty({ description: 'The title of the todo' })
  title: string;
}
