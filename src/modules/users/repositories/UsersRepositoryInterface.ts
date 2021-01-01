import User from '../infra/typeorm/entities/User';
import CreateUserDTO from '../dtos/CreateUserDTO';

export default interface UsersRepositoryInterface {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findAllProviders(except_user_id?: string): Promise<User[]>;
  create(data: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
