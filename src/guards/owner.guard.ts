import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const res = context.switchToHttp().getResponse();
    const req = context.switchToHttp().getRequest();

    if (res.user.role === 1) {
      return true;
    }

    if (res.user.id !== parseInt(req.params.userId, 10)) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
