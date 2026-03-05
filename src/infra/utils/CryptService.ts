import { randomBytes } from 'node:crypto'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import * as bcrypt from 'bcrypt'

import { Crypt } from '@protocols/crypt'

@Injectable()
export class CryptService implements Crypt {
  constructor(private readonly configService: ConfigService) {}

  async hash(text: string): Promise<string> {
    const appKey = this.configService.get('APP_KEY')
    const salt = this.configService.get('BCRYPT_SALT')

    return await bcrypt.hash(appKey + text, salt)
  }

  async compare(text: string, hash: string): Promise<boolean> {
    const appKey = this.configService.get('APP_KEY')

    return await bcrypt.compare(appKey + text, hash)
  }

  random(): string {
    return randomBytes(20).toString('hex')
  }
}
