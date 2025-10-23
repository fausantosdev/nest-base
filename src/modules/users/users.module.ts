import { Module } from '@nestjs/common'

import { PrismaService } from '@infra/database/prisma/prisma.service'

import { CreateUserUseCase } from './use-cases/create-user.usecase'
import { GetUserUseCase } from './use-cases/get-user.usecase'
import { GetUsersUseCase } from './use-cases/get-users.usecase'
import { UpdateUserUseCase } from './use-cases/update-user.usecase'
import { DeleteUserUseCase } from './use-cases/delete-user.usecase'

import { UsersController } from './users.controller'

import { UserRepository as Repository } from '@modules/users/repository/user.repository'
import { UserRepository } from '@infra/database/prisma/repositories/user-repository'
import { Crypt } from '@protocols/crypt'
import { CryptService } from '@infra/utils/CryptService'

@Module({
  controllers: [UsersController],
  exports: [GetUserUseCase],
  providers: [
    PrismaService,
    CreateUserUseCase,
    GetUserUseCase,
    GetUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: Repository,
      useClass: UserRepository,
    },
    {
      provide: Crypt,
      useClass: CryptService,
    },
  ],
})
export class UsersModule {}
