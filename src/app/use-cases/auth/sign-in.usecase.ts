import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { UserRepository } from '@domain/repositories/user.repository'

import { Crypt } from '../../contracts/crypt'

type SignInInput = {
  email: string
  password: string
}

type SignInOutput = {
  token: string
  expires_in: string | number
}

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cryptService: Crypt
  ) {}

  async handle(signIn: SignInInput): Promise<SignInOutput> {
    const { email, password } = signIn

    const userExists = await this.userRepository.findByEmail(email)

    if (
      !userExists ||
      !(await this.cryptService.compare(password, userExists.password_hash))
    )
      throw new UnauthorizedException('Invalid credentials')

    const payload = {
      sub: userExists.id,
      email: userExists.email,
      role: userExists.role,
    }

    const token = await this.jwtService.signAsync(payload)

    return {
      token,
      expires_in: this.configService.get('JWT_EXPIRATION_TIME'),
    }
  }
}
