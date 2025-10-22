import { Module } from '@nestjs/common'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

import { UsersModule } from '@modules/users/users.module'
import { Crypt } from '@protocols/crypt'
import { CryptService } from '@infra/utils/CryptService'

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: Crypt,
      useClass: CryptService,
    },
  ],
})
export class AuthModule {}
