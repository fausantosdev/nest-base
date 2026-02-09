import { IsEmail, IsHash, IsNotEmpty, Length } from 'class-validator'

export class ResetPasswordDto {
  @IsNotEmpty({
    message: 'Token is required',
  })
  @IsHash('sha1')
  token: string

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

  @IsNotEmpty({
    message: 'New password is required',
  })
  @Length(6, 100, {
    message: 'Password must be between 6 and 100 characters',
  })
  newPassword: string
}
