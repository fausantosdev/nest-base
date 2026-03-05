import { plainToInstance } from 'class-transformer'
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator'

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsString()
  APP_KEY: string

  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development

  @IsNumber()
  PORT: number = 3333

  @IsString()
  JWT_SECRET: string

  @IsNumber()
  JWT_EXPIRATION_TIME: number = 86400 // Por padrão 1 dia

  @IsString()
  DATABASE_URL: string

  @IsNumber()
  BCRYPT_SALT: number = 10
}

function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true, // Converte automaticamente para o tipo declarado
  })

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false, // Garante que nenhuma variável obrigatória falte
  })

  if (errors.length > 0) {
    // Mensagem mais amigável
    const formatted = errors
      .map((err) => `x ${Object.values(err.constraints || {}).join(', ')}`)
      .join('\n')

    throw new Error(`\n[Environment Validation Error]\n${formatted}\n`)
  }

  return validatedConfig
}

export { validate }
