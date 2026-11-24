import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsHash, IsNotEmpty, Length } from 'class-validator'

export class ResetPasswordDto {
  @ApiProperty({
    example: 'reset-password-token-string',
    description: 'Reset password token string',
  })
  @IsNotEmpty({
    message: 'Token is required',
  })
  @IsHash('sha1')
  token: string

  @ApiProperty({
    example: 'user@email.com',
    description: 'User email associated with the reset request',
  })
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail(
    {},
    {
      message: 'Email must be a valid email',
    }
  )
  email: string

  @ApiProperty({
    example: 'newStrongPassword123',
    description: 'New password that will replace the current one',
    minLength: 6,
    maxLength: 100,
  })
  @IsNotEmpty({
    message: 'New password is required',
  })
  @Length(6, 100, {
    message: 'Password must be between 6 and 100 characters',
  })
  newPassword: string
}
