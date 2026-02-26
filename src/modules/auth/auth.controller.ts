import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common'

import { SignInUseCase } from './use-cases/sign-in.usecase'
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase'
import { ForgotPasswordUseCase } from './use-cases/forgot-password.usecase'
import { ResetPasswordUseCase } from './use-cases/reset-password.usecase'

import { response } from '../../../src/common/helpers/response-helper'
import { AuthGuard } from '../../../src/guards/auth.guard'
import { SignInDto } from './dto/sign-in.dto'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'

import {
  ApiForgotPassword,
  ApiRefreshToken,
  ApiResetPassword,
  ApiSignIn,
} from './auth.swagger'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _signIn: SignInUseCase,
    private readonly _refreshToken: RefreshTokenUseCase,
    private readonly _forgotPassword: ForgotPasswordUseCase,
    private readonly _resetPassword: ResetPasswordUseCase
  ) {}

  @ApiSignIn()
  @Post('sign-in')
  async signIn(@Body() signIn: SignInDto) {
    const { token } = await this._signIn.handle(signIn)

    return response({
      data: token,
    })
  }

  @ApiRefreshToken()
  @UseGuards(AuthGuard)
  @Post('refresh-token')
  async refreshToken(@Request() request: any) {
    const [, token] = request.headers.authorization.split(' ')

    const { token: newToken } = await this._refreshToken.handle(token)

    return response({
      data: newToken,
    })
  }

  @ApiForgotPassword()
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
    const result = await this._forgotPassword.handle(forgotPassword.email)

    return response({
      data: result,
      message: 'If the email exists, a reset password link will be sent to it',
    })
  }

  @ApiResetPassword()
  @Post('reset-password')
  async resetPassword(@Body() { email, token, newPassword }: ResetPasswordDto) {
    const result = await this._resetPassword.handle({
      token,
      email,
      newPassword,
    })

    return response({
      data: result,
      message: 'Password reset successfully.',
    })
  }
}
