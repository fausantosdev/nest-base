import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'

import { response } from '@common/helpers/response-helper'

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
  ApiProfileUser,
  ApiUpdateUser,
} from './user.swagger'

import { Auth } from '@common/decorators/auth.decorator'
import { Role } from '@config/roles'
import {
  CurrentUser,
  CurrentUserType,
} from '@common/decorators/current-user.decorator'

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

  @ApiProfileUser()
  @Get('me')
  @Auth()
  async profile(@CurrentUser() user: CurrentUserType) {
    const result = await this.getUser.handle(user.sub)

    return response({
      data: result,
    })
  }

  @ApiGetUsers()
  @Get()
  @Auth(Role.ADMIN)
  async findAll() {
    const result = await this.getUsers.handle()

    return response({
      data: result,
    })
  }

  @ApiGetUser()
  @Get(':id')
  @Auth(Role.ADMIN)
  async findOne(@Param('id') id: string) {
    const result = await this.getUser.handle(id)

    return response({
      data: result,
    })
  }

  @ApiUpdateUser()
  @Put()
  @Auth()
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
  @Auth()
  async remove(@CurrentUser() user: CurrentUserType) {
    const result = await this.deleteUser.handle(user.sub)

    return response({
      data: result,
    })
  }
}
