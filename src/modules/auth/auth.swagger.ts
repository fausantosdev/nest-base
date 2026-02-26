import { applyDecorators } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { ResponseDto } from '@common/helpers/response-helper'

export function ApiSignIn() {
  return applyDecorators(
    ApiOperation({ summary: 'Authenticate user' }),
    ApiResponse({ type: ResponseDto })
  )
}

export function ApiRefreshToken() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Refresh access token' }),
    ApiResponse({ type: ResponseDto })
  )
}

export function ApiForgotPassword() {
  return applyDecorators(
    ApiOperation({ summary: 'Send password reset instructions' }),
    ApiResponse({ type: ResponseDto })
  )
}

export function ApiResetPassword() {
  return applyDecorators(
    ApiOperation({ summary: 'Reset user password' }),
    ApiResponse({ type: ResponseDto })
  )
}
