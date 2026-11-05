import { Injectable, UnauthorizedException } from '@nestjs/common'

import { UserRepository } from '@domain/repositories/user.repository'

import { Crypt } from '../../contracts/crypt'
import { Email } from '../../contracts/email'

type ForgotPasswordInput = {
  email: string
}

type ForgotPasswordOutput = boolean

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly crypt: Crypt,
    private readonly emailService: Email
  ) {}

  async handle({ email }: ForgotPasswordInput): Promise<ForgotPasswordOutput> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new UnauthorizedException('Email not found')

    const hash = this.crypt.random()

    const now = new Date()
    now.setHours(now.getHours() + 1)

    const updated = await this.userRepository.update(user.id, {
      password_reset_token: hash,
      password_reset_expires: now,
    })

    if (!updated)
      throw new UnauthorizedException('Failed to generate reset token')

    await this.emailService.send({
      to: updated.email,
      from: 'noreply@yourapp.com',
      subject: 'Recuperação de senha!',
      text: `
        Esqueceu sua senha?\n\n
        Sem problemas! Use o código abaixo para validar a sua identidade e criar uma nova senha:\n\n
        ${hash}\n\n
        Este código expira em 30 minutos por motivos de segurança.\n\n
        Se você não solicitou essa alteração, ignore este e-mail. Sua senha atual permanecerá segura.\n\n
        Atenciosamente,\n\n
        Segurança fausantosdev.
      `,
    })

    return !!updated
  }
}
