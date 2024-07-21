import {
  IsArray,
  IsEmail,
  IsEnum,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/utils/role.enum';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'The name of user ',
    example: 'Heng Data',
  })
  @MaxLength(255)
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email of user',
    example: 'admin123@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'The password of User',
  })
  @Length(8, 20)
  password: string;

  @IsArray()
  @IsEnum(Roles, {
    each: true,
    message: 'Must Be valid roles',
  })
  roles: string[];
}
