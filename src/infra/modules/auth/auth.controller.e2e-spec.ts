import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AppModule } from '../../../app.module'

describe('Sign in (E2E)', async () => {
  let app: INestApplication

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  app = moduleRef.createNestApplication()

  beforeAll(async () => {
    await app.init()
  })

  afterAll(() => {
    app.close()
  })

  it('[POST] /sign-in', async () => {
    await request(app.getHttpServer()).post('/auth/sign-up').send({
      name: 'John Doe',
      date_of_birth: new Date(),
      email: 'johndoe@mail.com',
      password_hash: 'abc123',
    })

    const response = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({
        email: 'johndoe@mail.com',
        password: 'abc123',
      })

    expect(response.statusCode).toBe(201)
  })
})
