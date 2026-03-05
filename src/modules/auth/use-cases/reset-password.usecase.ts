import { Injectable, UnauthorizedException } from '@nestjs/common'

import { UserRepository } from '@modules/users/repository/user.repository'
import { Crypt } from '@protocols/crypt'

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
  }: {
    token: string
    email: string
    newPassword: string
  }): Promise<boolean> {
    const user = await this.userRepository.findOne({ email })

    if (!user) throw new UnauthorizedException('Email not found')

    if (token != user.password_reset_token)
      throw new UnauthorizedException('Invalid token')

    const now = new Date()

    if (now > user.password_reset_expires)
      throw new UnauthorizedException('Token expired, request a new one')

    const newPasswordHash = await this.crypt.hash(newPassword)

    const updated = await this.userRepository.update(
      { id: user.id },
      {
        password_hash: newPasswordHash,
        password_reset_token: null,
        password_reset_expires: null,
      }
    )

    if (!updated)
      throw new UnauthorizedException('Failed to generate reset token')

    // Aqui o email é enviado para um microserviço de email, que é responsável por enviar o email para o usuário com o token de reset de senha

    return !!updated
  }
}
