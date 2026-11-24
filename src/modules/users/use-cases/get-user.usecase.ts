import { Injectable } from '@nestjs/common'

import { UserRepository } from '../repository/user.repository'

type GetUserInput = {
  id?: string
  email?: string
}

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle({ id, email }: GetUserInput) {
    if (id) return await this.userRepository.findById(id)
    if (email) return await this.userRepository.findByEmail(email)

    throw new Error('You must provide an id or email')
  }
}
