import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SentryGlobalFilter, SentryModule } from '@sentry/nestjs/setup'

import { UsersModule } from '@modules/users/users.module'
import { AuthModule } from '@modules/auth/auth.module'
import { validate } from './config/env.validation'
import { JwtModule } from '@nestjs/jwt'
import { APP_FILTER } from '@nestjs/core'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: +configService.get<number>('JWT_EXPIRATION_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 30000, // 30 seconds
          limit: 5, // 5 requests
        },
      ],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
})
export class AppModule {}
