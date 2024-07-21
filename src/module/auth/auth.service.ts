import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async authentication(auth: LoginDTO) {
    const user = await this.userService.findByEmail(auth.email);

    if (!user) {
      throw new BadRequestException();
    }

    if (!this.userService.compareHash(user.password, user.password)) {
      throw new BadRequestException('Invalid Credential');
    }

    return this.jwtService.sign({ sub: user.id });
  }

  async validateToken(token: string) {
    return await this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });
  }
}
