import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class SignInDto {
  @ApiProperty({
    example: 'email@mail.com',
    description: 'User email',
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
    example: '123456',
    description: 'User password',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @Length(6, 100, {
    message: 'Password must be between 6 and 100 characters',
  })
  password: string
}
