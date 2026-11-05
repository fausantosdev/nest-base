import { Injectable, UnauthorizedException } from '@nestjs/common'

import { UserRepository } from '@domain/repositories/user.repository'

import { Crypt } from '../../contracts/crypt'

type ResetPasswordInput = {
  token: string
  email: string
  newPassword: string
}

type ResetPasswordOutput = boolean

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly crypt: Crypt
  ) {}

  async handle({
    token,
    email,
    newPassword,
  }: ResetPasswordInput): Promise<ResetPasswordOutput> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new UnauthorizedException('Email not found')

    if (token != user.password_reset_token)
      throw new UnauthorizedException('Invalid token')

    const now = new Date()

    if (now > user.password_reset_expires)
      throw new UnauthorizedException('Token expired, request a new one')

    const newPasswordHash = await this.crypt.hash(newPassword)

    const updated = await this.userRepository.update(user.id, {
      password_hash: newPasswordHash,
      password_reset_token: null,
      password_reset_expires: null,
    })

    if (!updated)
      throw new UnauthorizedException('Failed to generate reset token')

    return !!updated
  }
}
