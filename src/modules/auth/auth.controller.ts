import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common'

import { SignInUseCase } from './use-cases/sign-in.use-case'
import { RefreshTokenUseCase } from './use-cases/refresh-token.use-case'

import { response } from 'src/common/helpers/response-helper'
import { AuthGuard } from 'src/guards/auth.guard'
import { SignInDto } from './dto/sign-in.dto'
import { ForgotPasswordDto } from './dto/forgot-password.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _signIn: SignInUseCase,
    private readonly _refreshToken: RefreshTokenUseCase
  ) {}

  @Post('sign-in')
  async signIn(@Body() signIn: SignInDto) {
    const { token } = await this._signIn.handle(signIn)

    return response({
      data: token,
    })
  }

  @UseGuards(AuthGuard)
  @Post('refresh-token')
  async refreshToken(@Request() request: any) {
    const [, token] = request.headers.authorization.split(' ')

    const { token: newToken } = await this._refreshToken.handle(token)

    return response({
      data: newToken,
    })
  }
}
