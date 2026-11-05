import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common'
import { ThrottlerGuard } from '@nestjs/throttler'

import { SignInUseCase } from '@app/use-cases/auth/sign-in.usecase'
import { SignUpUseCase } from '@app/use-cases/auth/sign-up.usecase'
import { GetUserUseCase } from '@app/use-cases/auth/get-user.usecase'
import { RefreshTokenUseCase } from '@app/use-cases/auth/refresh-token.usecase'
import { ForgotPasswordUseCase } from '@app/use-cases/auth/forgot-password.usecase'
import { ResetPasswordUseCase } from '@app/use-cases/auth/reset-password.usecase'

import { response } from '../../common/helpers/response-helper'

import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'

import {
  ApiForgotPassword,
  ApiRefreshToken,
  ApiResetPassword,
  ApiSignIn,
  ApiSignUp,
} from './auth.swagger'

import { Auth } from '@infra/common/decorators/auth.decorator'

import {
  CurrentUser,
  CurrentUserType,
} from '@infra/common/decorators/current-user.decorator'

@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly _signIn: SignInUseCase,
    private readonly _signUp: SignUpUseCase,
    private readonly _refreshToken: RefreshTokenUseCase,
    private readonly _getUser: GetUserUseCase,
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

  @ApiSignUp()
  @Post('sign-up')
  async signUp(@Body() signUp: SignUpDto) {
    const result = await this._signUp.handle(signUp)

    return response({
      data: result,
    })
  }

  @ApiResetPassword()
  @Post('me')
  @Auth()
  async me(@CurrentUser() user: CurrentUserType) {
    const { sub } = user

    const result = await this._getUser.handle(sub)

    return response({ data: result })
  }

  @ApiRefreshToken()
  @Post('refresh-token')
  @Auth()
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
    const result = await this._forgotPassword.handle({
      email: forgotPassword.email,
    })

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
