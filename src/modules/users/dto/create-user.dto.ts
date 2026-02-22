import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user.',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  @Length(3, 100, {
    message: 'Name must be between 3 and 100 characters',
  })
  name: string

  @ApiProperty({
    example: '1990-08-15T00:00:00.000Z',
    description:
      'User date of birth in ISO 8601 DateTime format (YYYY-MM-DDTHH:mm:ss.sssZ).',
  })
  @IsNotEmpty({
    message: 'Date of birth is required',
  })
  date_of_birth: Date

  @ApiProperty({
    example: 'john.doe@email.com',
    description:
      'Valid email address used for authentication and communication.',
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
    example: 'strongPassword123',
    description: 'User password (minimum 6 characters).',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @Length(6, 100, {
    message: 'Password must be between 6 and 100 characters',
  })
  password_hash: string
}
