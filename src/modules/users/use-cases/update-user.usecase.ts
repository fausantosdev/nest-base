import { BadRequestException, Injectable } from '@nestjs/common'

import { UserRepository } from '../repository/user.repository'
import { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(id: string, data: UpdateUserDto): Promise<object> {
    if (!data || Object.keys(data).length === 0) {
      throw new BadRequestException('No data provided for update')
    }

    const updated = await this.userRepository.update({ id }, data)

    return updated
  }
}
