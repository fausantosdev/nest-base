import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { SignInUseCase } from './use-cases/sign-in.usecase'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [SignInUseCase],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
