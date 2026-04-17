import { Injectable, UnauthorizedException } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

import { UserRepository } from '@modules/users/repository/user.repository'
import { Crypt } from '@protocols/crypt'

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly crypt: Crypt,
    private readonly mailerService: MailerService
  ) {}

  async handle(email: string): Promise<boolean> {
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

    await this.mailerService.sendMail({
      to: updated.email,
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
