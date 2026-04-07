import { Injectable } from '@nestjs/common'

import { UserRepository } from '../repository/user.repository'

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(id: string) {
    const user = await this.userRepository.findById(id)

    return user
  }
}
