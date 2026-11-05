import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

import { Email, SendEmailInput } from '@app/contracts/email'

@Injectable()
export class EmailService implements Email {
  constructor(private readonly mailService: MailerService) {}

  async send({ from, to, subject, text }: SendEmailInput): Promise<boolean> {
    const result = await this.mailService.sendMail({
      to,
      from,
      subject,
      text,
    })

    console.log(result)

    if (!result) return false

    return true
  }
}
