import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Request,
} from '@nestjs/common'

import { CreateUserUseCase } from './use-cases/create-user.usecase'

import { CreateUserDto } from './dto/create-user.dto'
import { GetUserUseCase } from './use-cases/get-user.usecase'
import { GetUsersUseCase } from './use-cases/get-users.usecase'
import { UpdateUserUseCase } from './use-cases/update-user.usecase'
import { DeleteUserUseCase } from './use-cases/delete-user.usecase'

import { UpdateUserDto } from './dto/update-user.dto'
import { response } from 'src/common/helpers/response-helper'
import { AuthGuard } from 'src/guards/auth.guard'

@Controller('/users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly getUsers: GetUsersUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase
  ) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const result = await this.createUser.handle(data)

    return response({
      data: result,
    })
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async profile(@Request() request: Express.Request) {
    const { sub } = request.user

    const result = await this.getUser.handle({ id: sub })

    return response({
      data: result,
    })
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    const result = await this.getUsers.handle()

    return response({
      data: result,
    })
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    const result = await this.getUser.handle({ id })

    return response({
      data: result,
    })
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.updateUser.handle(id, updateUserDto)

    return response({
      data: result,
    })
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    const result = await this.deleteUser.handle(id)

    return response({
      data: result,
    })
  }
}
