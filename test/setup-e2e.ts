import 'reflect-metadata'
import { config } from 'dotenv'

import { PrismaClient } from '@infra/database/prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { validate } from '@config/env.validation'

//config({ path: '.env', override: true })
config({ path: '.env.test.local', override: true })

const env = validate(process.env)
//const env = envSchema.parse(process.env)

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: env.DATABASE_URL }),
})

function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable')
  }

  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  process.env.DATABASE_URL = databaseURL

  execSync('npx prisma migrate deploy', { stdio: 'inherit' })
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
