import { Role } from '@config/roles'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector // O reflactor permite acessar os metadados definidos pelos decoradores, como o @Roles
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles || requiredRoles.length === 0) {
      // Se não houver papéis definidos, permite o acesso livremente
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    return requiredRoles.includes(user.role)
  }
}
