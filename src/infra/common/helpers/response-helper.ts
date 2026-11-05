import { ApiProperty } from '@nestjs/swagger'

class ResponseDto {
  @ApiProperty({ example: true })
  status?: boolean

  @ApiProperty({ example: 'your-response-data' })
  data?: any

  @ApiProperty({ example: null })
  message?: string
}

function response({
  status = true,
  data = null,
  message = '',
}: ResponseDto): ResponseDto {
  return {
    status,
    data,
    message,
  }
}

export { response, ResponseDto }
