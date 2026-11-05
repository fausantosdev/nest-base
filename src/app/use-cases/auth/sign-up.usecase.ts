import { HttpException, Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

import { UserRepository } from '@domain/repositories/user.repository'
import { User } from '@domain/entities/user.entity'

import { Crypt } from '../../contracts/crypt'

type SignUpInput = {
  name: string
  date_of_birth: Date
  email: string
  password_hash: string
}

type SignUpOutput = boolean

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptService: Crypt,
    private readonly mailerService: MailerService
  ) {}

  async handle(signUpInput: SignUpInput): Promise<SignUpOutput> {
    const { name, date_of_birth, email, password_hash } = signUpInput

    const emailAlreadyExists = await this.userRepository.findByEmail(email)

    if (emailAlreadyExists)
      throw new HttpException('Email already registered', 400)

    const user = new User()

    user.name = name
    user.date_of_birth = date_of_birth
    user.email = email
    user.password_hash = await this.cryptService.hash(password_hash)

    const newUser = await this.userRepository.create(user)

    if (newUser.id) {
      await this.mailerService.sendMail({
        to: `${newUser.name} ${newUser.email}`,
        subject: 'Bem vindo!',
        text: `Olá ${newUser.name}!\nFicamos muito felizes em ver você por aqui. Sua conta está pronta para uso!`,
      })
    }

    return !!newUser
  }
}
