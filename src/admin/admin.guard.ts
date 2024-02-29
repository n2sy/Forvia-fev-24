import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/auth/generics/roleEnum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.user);
    if (request.user.role == RoleEnum.ROLE_ADMIN) return true;
    return false;
  }
}
