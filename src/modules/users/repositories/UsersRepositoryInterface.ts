import User from '../infra/typeorm/entities/User';
import CreateUserDTO from '../dtos/CreateUserDTO';
import FindAllProvidersDTO from '../dtos/FindAllProvidersDTO';

export default interface UsersRepositoryInterface {
  findAllProviders(data: FindAllProvidersDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
