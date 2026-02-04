import { faker } from '@faker-js/faker'

import { PrismaService } from '../src/infra/database/prisma/prisma.service'

const prisma = new PrismaService()

async function seed() {
  const fakeUser = (): any => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password_hash: faker.internet.password(),
  })

  for (let i = 0; i <= 5; i++) {
    await prisma.user.create({
      data: fakeUser(),
    })
  }
}

seed()
  .then(async () => {
    console.log('~ database seeded')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
