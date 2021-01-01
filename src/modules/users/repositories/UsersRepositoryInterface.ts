import User from '../infra/typeorm/entities/User';
import CreateUserDTO from '../dtos/CreateUserDTO';
import FindAllProvidersDTO from '../dtos/FindAllProvidersDTO';

export default interface UsersRepositoryInterface {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findAllProviders(data: FindAllProvidersDTO): Promise<User[]>;
  create(data: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
