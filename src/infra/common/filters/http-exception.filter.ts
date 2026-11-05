import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { Request, Response } from 'express'

import { response as responseHelper } from '../helpers/response-helper'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    const { message } = exception.getResponse() as { message: any }

    response.status(status || 500).json(
      responseHelper({
        status: false,
        message: message || exception.getResponse() || 'Internal server error',
      })
    )
  }
}
