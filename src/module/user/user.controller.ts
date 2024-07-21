import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Route')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUser() {
    return this.userService.getAll();
  }

  @Get('/:id')
  async getOneUser(@Param('id') id: number) {
    return await this.userService.getOneUser(id);
  }

  @Post('post')
  async createUser(@Body() reqBody: CreateUserDto) {
    return await this.userService.createUser(reqBody);
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: number, @Body() reqBody: UpdateUserDto) {
    return await this.userService.editUser(id, reqBody);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    await this.userService.deleteOne(id);
  }
}
