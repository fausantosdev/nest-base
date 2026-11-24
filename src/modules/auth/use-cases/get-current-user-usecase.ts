import { Injectable } from '@nestjs/common'

import { UserRepository } from '@modules/users/repository/user.repository'

type GetCurrentUserInput = {
  id: string
}

@Injectable()
export class GetCurrentUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle({ id }: GetCurrentUserInput) {
    const currentUser = await this.userRepository.findById(id)

    return currentUser
  }
}
