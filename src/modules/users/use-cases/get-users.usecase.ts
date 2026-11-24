import { Injectable } from '@nestjs/common'

import { UserRepository } from '../repository/user.repository'

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle() {
    const users = await this.userRepository.read({})

    return users
  }
}
