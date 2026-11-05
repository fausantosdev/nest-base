import { Role } from '@config/roles'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export type CurrentUserType = {
  sub: string
  email: string
  role: Role
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Express.Request>()
    return request.user
  }
)
