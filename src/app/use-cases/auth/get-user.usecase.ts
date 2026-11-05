import { Injectable } from '@nestjs/common'

import { UserRepository } from '@domain/repositories/user.repository'

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(id: string) {
    const user = await this.userRepository.findById(id)

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      date_of_birth: user.date_of_birth,
      created_at: user.created_at,
    }
  }
}
