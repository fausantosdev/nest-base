import { HttpException, Injectable } from '@nestjs/common'

import { UserRepository } from '../repository/user.repository'
import { Crypt } from '@protocols/crypt'
import { CreateUserDto } from '../dto/create-user.dto'

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptService: Crypt
  ) {}

  async handle(createUserDto: CreateUserDto) {
    const { name, date_of_birth, email, password_hash } = createUserDto

    const emailAlreadyExists = await this.userRepository.findOne({ email })

    if (emailAlreadyExists)
      throw new HttpException('Email already registered', 400)

    const user = await this.userRepository.create({
      name,
      date_of_birth,
      email,
      password_hash: await this.cryptService.hash(password_hash, 8),
    })

    return user
  }
}
