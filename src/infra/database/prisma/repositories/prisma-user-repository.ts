import { Injectable } from '@nestjs/common'

import { Prisma } from '../generated/client'

import { PrismaService } from '../prisma.service'

import { UserRepository } from '@modules/users/repository/user.repository'
import { User } from '@modules/users/entities/user.entity'
import { UpdateUserDto } from '@modules/users/dto/update-user.dto'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create({
    name,
    email,
    date_of_birth,
    password_hash,
  }: User): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name,
        date_of_birth,
        email,
        password_hash,
      },
    })
  }

  public async read(where: Partial<User>): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: where as Prisma.UserWhereInput,
    })
  }

  public async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    })
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    })
  }

  public async update(id: string | number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id: String(id) },
      data: data as Prisma.UserUpdateInput,
    })
  }

  public async delete(id: string): Promise<User | null> {
    return await this.prisma.user.delete({ where: { id } })
  }
}
