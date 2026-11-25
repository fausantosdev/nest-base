import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'

import { AuthGuard } from '../guards/auth.guard'
import { RolesGuard } from '../guards/roles.guard'

import { AuthOptions } from '@config/auth-options.types'

import { ROLE_KEY } from './role.decorator'

export function Access(options?: AuthOptions) {
  const decorators = [UseGuards(AuthGuard, RolesGuard)]

  if (options?.role) {
    decorators.push(SetMetadata(ROLE_KEY, [options.role]))
  }

  return applyDecorators(...decorators)
}
