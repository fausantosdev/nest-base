import { Injectable } from '@nestjs/common'

import { Prisma } from '../generated/client'

import { PrismaService } from '../prisma.service'

import { UserRepository as Repository } from '@modules/users/repository/user.repository'
import { User } from '@modules/users/entities/user.entity'

@Injectable()
export class UserRepository implements Repository {
  constructor(private readonly prisma: PrismaService) {}

  public async create({
    name,
    email,
    date_of_birth,
    password_hash,
  }: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name,
        date_of_birth,
        email,
        password_hash,
      },
    })
  }

  public async read(where: Prisma.UserWhereInput): Promise<User[]> {
    return await this.prisma.user.findMany({ where })
  }

  public async findOne(
    where: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return await this.prisma.user.findUnique({ where })
  }

  public async update(
    where: Prisma.UserWhereUniqueInput,
    data: object
  ): Promise<User> {
    return this.prisma.user.update({
      where,
      data,
    })
  }

  public async delete(
    where: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return await this.prisma.user.delete({ where })
  }
}
