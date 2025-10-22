import { Module } from '@nestjs/common'

import { PrismaService } from '@infra/database/prisma/prisma.service'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'

import { UserRepository as Repository } from '@modules/users/repository/user.repository'
import { UserRepository } from '@infra/database/prisma/repositories/user-repository'
import { Crypt } from '@protocols/crypt'
import { CryptService } from '@infra/utils/CryptService'

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  providers: [
    PrismaService,
    UsersService,
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
