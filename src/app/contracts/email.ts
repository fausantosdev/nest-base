type SendEmailInput = {
  from: string
  to: string
  subject: string
  text?: string
}

abstract class Email {
  abstract send(data: SendEmailInput): Promise<boolean>
}

export { Email, SendEmailInput }
