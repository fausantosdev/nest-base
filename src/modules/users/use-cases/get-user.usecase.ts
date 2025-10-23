import { Injectable } from '@nestjs/common'

import { UserRepository } from '../repository/user.repository'

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(where: { id?: string; email?: string }) {
    const user = await this.userRepository.findOne(where)

    return user
  }
}
