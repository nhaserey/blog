import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { CategoryEnum } from 'src/utils/category.enum';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The category of news',
    example: 'Social',
  })
  @IsEnum(CategoryEnum, {
    each: true,
    message: 'Must Provide Valid News Type',
  })
  @IsString()
  name: string;
}
