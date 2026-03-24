import { Module } from '@nestjs/common'

import { SignInUseCase } from './use-cases/sign-in.usecase'
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase'
import { ForgotPasswordUseCase } from './use-cases/forgot-password.usecase'

import { AuthController } from './auth.controller'

import { Crypt } from '@protocols/crypt'
import { CryptService } from '@infra/utils/CryptService'

import { UserRepository as Repository } from '@modules/users/repository/user.repository'
import { UserRepository } from '@infra/database/prisma/repositories/user-repository'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { ResetPasswordUseCase } from './use-cases/reset-password.usecase'

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    PrismaService,
    SignInUseCase,
    RefreshTokenUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    {
      provide: Crypt,
      useClass: CryptService,
    },
    {
      provide: Repository,
      useClass: UserRepository,
    },
  ],
})
export class AuthModule {}
