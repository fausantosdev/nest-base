import { BadRequestException, Injectable } from '@nestjs/common'

import { User } from '@domain/entities/user.entity'
import { UserRepository } from '@domain/repositories/user.repository'

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(id: string): Promise<boolean> {
    const user = await this.userRepository.findById(id)

    if (!user) throw new BadRequestException('User not found')

    const deleted = (await this.userRepository.delete(id)) as User

    return !!deleted
  }
}
