import { Module } from '@nestjs/common'

import { Crypt } from '@app/contracts/crypt'
import { Email } from '@app/contracts/email'

import { SignInUseCase } from '@app/use-cases/auth/sign-in.usecase'
import { SignUpUseCase } from '@app/use-cases/auth/sign-up.usecase'
import { GetUserUseCase } from '@app/use-cases/auth/get-user.usecase'
import { RefreshTokenUseCase } from '@app/use-cases/auth/refresh-token.usecase'
import { ForgotPasswordUseCase } from '@app/use-cases/auth/forgot-password.usecase'
import { ResetPasswordUseCase } from '@app/use-cases/auth/reset-password.usecase'

import { UserRepository } from '@domain/repositories/user.repository'

import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma-user-repository'
import { PrismaService } from '@infra/database/prisma/prisma.service'

import { CryptService } from '../../utils/CryptService'
import { EmailService } from '../../utils/EmailService'

import { AuthController } from './auth.controller'

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    PrismaService,
    SignInUseCase,
    SignUpUseCase,
    GetUserUseCase,
    RefreshTokenUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
    {
      provide: Crypt,
      useClass: CryptService,
    },
    {
      provide: Email,
      useClass: EmailService,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AuthModule {}
