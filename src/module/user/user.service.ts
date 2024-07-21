import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll() {
    return await this.userRepository.find({
      relations: ['post', 'post.category'],
    });
  }

  async getOneUser(id: number, userEntity?: User) {
    const foundUser = await this.userRepository
      .findOne({ where: { id } })
      .then((user) =>
        !userEntity ? user : !!user && userEntity.id === user.id ? user : null,
      );
    if (!foundUser) {
      throw new NotFoundException('User Not Found');
    }

    return foundUser;
  }
  async findByEmail(email: string): Promise<User> | null {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const userExist = await this.userRepository.findOne({
      where: { email: userDto.email },
    });
    if (userExist) {
      throw new BadRequestException('User already register');
    }

    const newUser = this.userRepository.create(userDto);
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;
  }

  async editUser(
    id: number,
    userDto: UpdateUserDto,
    userEntity?: User,
  ): Promise<User> {
    const user = await this.getOneUser(id, userEntity);
    const editedUser = Object.assign(user, userDto);
    return editedUser;
  }

  async deleteOne(id: number, userEntity?: User) {
    const user = await this.getOneUser(id, userEntity);

    await this.userRepository.remove(user);

    return 'The User has been deleted';
  }

  async compareHash(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
