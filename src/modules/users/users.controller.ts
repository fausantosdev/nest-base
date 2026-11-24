import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'

import {
  CurrentUser,
  CurrentUserType,
} from '@common/decorators/current-user.decorator'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { CreateUserUseCase } from './use-cases/create-user.usecase'
import { GetUserUseCase } from './use-cases/get-user.usecase'
import { GetUsersUseCase } from './use-cases/get-users.usecase'
import { UpdateUserUseCase } from './use-cases/update-user.usecase'
import { DeleteUserUseCase } from './use-cases/delete-user.usecase'

import {
  ApiCreateUser,
  ApiDeleteUser,
  ApiGetUser,
  ApiGetUsers,
  ApiUpdateUser,
} from './user.swagger'

import { response } from '@common/helpers/response-helper'

@Controller('/users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly getUsers: GetUsersUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase
  ) {}

  @ApiCreateUser()
  @Post()
  async create(@Body() data: CreateUserDto) {
    const result = await this.createUser.handle(data)

    return response({
      data: result,
    })
  }

  @ApiGetUsers()
  @Get()
  async findAll() {
    const result = await this.getUsers.handle()

    return response({
      data: result,
    })
  }

  @ApiGetUser()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.getUser.handle({})

    return response({
      data: result,
    })
  }

  @ApiUpdateUser()
  @Put()
  async update(
    @CurrentUser() user: CurrentUserType,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const result = await this.updateUser.handle(user.sub, updateUserDto)

    return response({
      data: result,
    })
  }

  @ApiDeleteUser()
  @Delete()
  async remove(@CurrentUser() user: CurrentUserType) {
    const result = await this.deleteUser.handle(user.sub)

    return response({
      data: result,
    })
  }
}
