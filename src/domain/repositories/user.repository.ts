import { User } from '../entities/user.entity'

export abstract class UserRepository {
  abstract create(data: User): Promise<User>
  abstract read(where: Partial<User>): Promise<User[]>
  abstract findById(id: string | number): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract update(
    id: string | number,
    data: Omit<Partial<User>, 'id' | 'created_at' | 'updated_at'>
  ): Promise<User>
  abstract delete(id: string | number): Promise<object | null>
}
