import { ApiProperty } from '@nestjs/swagger'
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    example: 'Flávio Santos',
    description: 'User full name',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  name: string

  @ApiProperty({
    example: 'user@email.com',
    description: 'User email address',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string

  @ApiProperty({
    example: 'StrongPassword123',
    description: 'User password',
    minLength: 8,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @Length(8, 100, {
    message: 'Password must be between 8 and 100 characters',
  })
  password: string

  @ApiProperty({
    example: '1995-08-21',
    description: 'User date of birth',
    type: String,
    format: 'date',
  })
  @IsNotEmpty({ message: 'Date of birth is required' })
  @IsDateString(
    {},
    {
      message: 'Date of birth must be a valid date',
    }
  )
  dateOfBirth: string
}
