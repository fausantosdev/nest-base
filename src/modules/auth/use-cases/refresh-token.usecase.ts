import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { GetUserUseCase } from '@modules/users/use-cases/get-user.usecase'

import { AuthResponseDto } from '../dto/auth-response.dto'
import { User } from '@modules/users/entities/user.entity'

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly getUser: GetUserUseCase,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async handle(token: string): Promise<AuthResponseDto> {
    const decodedToken = await this.jwtService.decode(token)

    const { sub } = decodedToken as { sub: string; email: string }

    const user = (await this.getUser.handle({ id: sub })) as User

    if (!user) throw new UnauthorizedException()

    const payload = {
      sub: user.id,
      email: user.email,
    }

    const newToken = await this.jwtService.signAsync(payload)

    return {
      token: newToken,
      expires_in: this.configService.get('JWT_EXPIRATION_TIME'),
    }
  }
}
