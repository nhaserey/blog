import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const { authorization } = req.headers;
      if (!authorization || authorization.trim() === '') {
        throw new BadRequestException('Please Provide Token');
      }
      const authToken = authorization.replace(/bearer/gim, '').trim();
      const res = await this.authService.validateToken(authToken);
      req.decodedData = res;
      return true;
    } catch (error) {
      console.log('Error processing route');
    }
  }
}
