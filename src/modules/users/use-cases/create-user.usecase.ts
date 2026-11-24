import { ConflictException, Injectable } from '@nestjs/common'

import { UserRepository } from '@modules/users/repository/user.repository'
import { User } from '@modules/users/entities/user.entity'

import { Crypt } from '@protocols/crypt'

type CreateUserInput = {
  name: string
  email: string
  password: string
  dateOfBirth: string
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptService: Crypt
  ) {}

  async handle(data: CreateUserInput) {
    const { name, email, password, dateOfBirth } = data

    const userExists = await this.userRepository.findByEmail(email)

    if (userExists)
      throw new ConflictException(
        'An account is already associated with this email address.'
      )

    const user = new User()
    user.name = name
    user.email = email
    user.password_hash = await this.cryptService.hash(password)
    user.date_of_birth = new Date(dateOfBirth)

    const newUser = await this.userRepository.create(user)

    return {
      newUser: newUser,
    }
  }
}
