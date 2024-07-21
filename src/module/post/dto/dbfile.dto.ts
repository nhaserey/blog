import { ApiProperty } from '@nestjs/swagger';

export class ThumnailDto {
  @ApiProperty({
    description: 'The image of news',
    example: 'http://localhost:8888/uploads/example.jpg',
  })
  url: string;
}
