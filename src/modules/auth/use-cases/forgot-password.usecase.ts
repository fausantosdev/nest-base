import { Injectable, UnauthorizedException } from '@nestjs/common'

import { UserRepository } from '@modules/users/repository/user.repository'
import { Crypt } from '@protocols/crypt'

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly crypt: Crypt
  ) {}

  async handle(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ email })

    if (!user) throw new UnauthorizedException('Email not found')

    const hash = this.crypt.random()

    const now = new Date()
    now.setHours(now.getHours() + 1)

    const updated = await this.userRepository.update(
      { id: user.id },
      {
        password_reset_token: hash,
        password_reset_expires: now,
      }
    )

    // Aqui o email é enviado para um microserviço de email, que é responsável por enviar o email para o usuário com o token de reset de senha

    if (!updated)
      throw new UnauthorizedException('Failed to generate reset token')

    return !!updated
  }
}
