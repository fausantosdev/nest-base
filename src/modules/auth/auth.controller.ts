import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common'

import { SignUpUseCase } from './use-cases/sign-up.usecase'
import { SignInUseCase } from './use-cases/sign-in.usecase'
import { RefreshTokenUseCase } from './use-cases/refresh-token.usecase'
import { ForgotPasswordUseCase } from './use-cases/forgot-password.usecase'
import { ResetPasswordUseCase } from './use-cases/reset-password.usecase'

import { response } from '@common/helpers/response-helper'
import { AuthGuard } from '@common/guards/auth.guard'
import { SignInDto } from './dto/sign-in.dto'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'

import {
  ApiForgotPassword,
  ApiProfileUser,
  ApiRefreshToken,
  ApiResetPassword,
  ApiSignIn,
} from './auth.swagger'
import { ThrottlerGuard } from '@nestjs/throttler'
import { SignUpDto } from './dto/sign-up.dto'

import {
  CurrentUser,
  CurrentUserType,
} from '@common/decorators/current-user.decorator'
import { GetCurrentUserUseCase } from './use-cases/get-current-user-usecase'

@UseGuards(ThrottlerGuard)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly _signUp: SignUpUseCase,
    private readonly _signIn: SignInUseCase,
    private readonly getCurrentUser: GetCurrentUserUseCase,
    private readonly _refreshToken: RefreshTokenUseCase,
    private readonly _forgotPassword: ForgotPasswordUseCase,
    private readonly _resetPassword: ResetPasswordUseCase
  ) {}

  @Post('sign-up')
  async signUp(@Body() data: SignUpDto) {
    const { name, email, password, dateOfBirth } = data

    await this._signUp.handle({
      name,
      email,
      password,
      dateOfBirth,
    })

    return response({})
  }

  @ApiSignIn()
  @Post('sign-in')
  async signIn(@Body() data: SignInDto) {
    const { email, password } = data

    const { token } = await this._signIn.handle({
      email,
      password,
    })

    return response({
      data: token,
    })
  }

  @ApiProfileUser()
  @UseGuards(AuthGuard)
  @Get('me')
  async profile(@CurrentUser() user: CurrentUserType) {
    const result = await this.getCurrentUser.handle({ id: user.sub })

    return response({
      data: result,
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
