import { Test, TestingModule } from '@nestjs/testing'
import { CreateUserUseCase } from './create-user.usecase'

describe('Create user use case', () => {
  let createUser: CreateUserUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserUseCase],
    }).compile()

    createUser = module.get<CreateUserUseCase>(CreateUserUseCase)
  })

  it('should be defined', () => {
    expect(createUser).toBeDefined()
  })
})
