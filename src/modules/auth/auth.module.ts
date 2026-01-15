import { Module } from '@nestjs/common'

import { SignInUseCase } from './use-cases/sign-in.usecase'
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase'

import { AuthController } from './auth.controller'

import { UsersModule } from '@modules/users/users.module'
import { Crypt } from '@protocols/crypt'
import { CryptService } from '@infra/utils/CryptService'

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    SignInUseCase,
    RefreshTokenUseCase,
    {
      provide: Crypt,
      useClass: CryptService,
    },
  ],
})
export class AuthModule {}
