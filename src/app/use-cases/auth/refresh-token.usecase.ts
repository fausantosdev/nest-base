import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { UserRepository } from '@domain/repositories/user.repository'

type RefreshTokenInput = {
  token: string
}

type RefreshTokenOutput = {
  token: string
  expires_in: string | number
}

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async handle({ token }: RefreshTokenInput): Promise<RefreshTokenOutput> {
    const decodedToken = await this.jwtService.decode(token)

    const { sub } = decodedToken as { sub: string; email: string }

    const user = await this.userRepository.findById(sub)

    if (!user) throw new UnauthorizedException()

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    }

    const newToken = await this.jwtService.signAsync(payload)

    return {
      token: newToken,
      expires_in: this.configService.get('JWT_EXPIRATION_TIME'),
    }
  }
}
