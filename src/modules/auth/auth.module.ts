import { Module } from '@nestjs/common'

import { SignUpUseCase } from './use-cases/sign-up.usecase'
import { SignInUseCase } from './use-cases/sign-in.usecase'
import { GetCurrentUserUseCase } from './use-cases/get-current-user-usecase'
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase'
import { ForgotPasswordUseCase } from './use-cases/forgot-password.usecase'

import { AuthController } from './auth.controller'

import { Crypt } from '@protocols/crypt'
import { CryptService } from '@infra/services/crypt.service'

import { PrismaService } from '@infra/database/prisma/prisma.service'
import { ResetPasswordUseCase } from './use-cases/reset-password.usecase'

import { UsersModule } from '@modules/users/users.module'

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    PrismaService,
    SignInUseCase,
    SignUpUseCase,
    GetCurrentUserUseCase,
    RefreshTokenUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    {
      provide: Crypt,
      useClass: CryptService,
    },
  ],
})
export class AuthModule {}
