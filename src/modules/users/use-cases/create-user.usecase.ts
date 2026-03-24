import { HttpException, Injectable } from '@nestjs/common'

import { UserRepository } from '../repository/user.repository'
import { Crypt } from '@protocols/crypt'
import { CreateUserDto } from '../dto/create-user.dto'
import { User } from '../entities/user.entity'

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptService: Crypt
  ) {}

  async handle(createUserDto: CreateUserDto): Promise<User> {
    const { name, date_of_birth, email, password_hash } = createUserDto

    const emailAlreadyExists = await this.userRepository.findByEmail(email)

    if (emailAlreadyExists)
      throw new HttpException('Email already registered', 400)

    const user = new User()

    user.name = name
    user.date_of_birth = date_of_birth
    user.email = email
    user.password_hash = await this.cryptService.hash(password_hash)

    const newUser = await this.userRepository.create(user)

    return newUser
  }
}
