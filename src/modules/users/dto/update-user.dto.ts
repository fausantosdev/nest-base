import { PartialType } from '@nestjs/mapped-types'

import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  role?: string
  password_reset_token?: string
  password_reset_expires?: Date | string
  created_at?: Date | string
  updated_at?: Date | string
}
