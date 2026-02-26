import { applyDecorators } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger'

import { ResponseDto } from '@common/helpers/response-helper'

export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Create user' }),
    ApiResponse({ type: ResponseDto })
  )
}

export function ApiProfileUser() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get user profile data' }),
    ApiResponse({ type: ResponseDto })
  )
}

export function ApiGetUsers() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get users' }),
    ApiResponse({ type: ResponseDto })
  )
}

export function ApiGetUser() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get user' }),
    ApiParam({
      name: 'id',
      example: '6c445512-6f80-44b2-a069-bd4a7b0e9f68',
    }),
    ApiResponse({ type: ResponseDto })
  )
}

export function ApiUpdateUser() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update user' }),
    ApiParam({
      name: 'id',
      example: '6c445512-6f80-44b2-a069-bd4a7b0e9f68',
    }),
    ApiResponse({ type: ResponseDto })
  )
}

export function ApiDeleteUser() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Delete user' }),
    ApiParam({
      name: 'id',
      example: '6c445512-6f80-44b2-a069-bd4a7b0e9f68',
    }),
    ApiResponse({ type: ResponseDto })
  )
}
