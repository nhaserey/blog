import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private readonly authService: AuthService) {
    super({
      userNameField: 'email',
      userPasswordField: 'password',
    });
  }
}
