import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { SignInDto } from '../dto/sign-in.dto'
import { AuthResponseDto } from '../dto/auth-response.dto'

import { UserRepository } from '@modules/users/repository/user.repository'
import { Crypt } from '@protocols/crypt'

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly cryptService: Crypt
  ) {}

  async handle(signIn: SignInDto): Promise<AuthResponseDto> {
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
    }

    const token = await this.jwtService.signAsync(payload)

    return {
      token,
      expires_in: this.configService.get('JWT_EXPIRATION_TIME'),
    }
  }
}
