import { SetMetadata } from '@nestjs/common'
import { Role as R } from '@config/roles'

export const ROLE_KEY = 'role'

export const Role = (role: R) => SetMetadata(ROLE_KEY, role)
