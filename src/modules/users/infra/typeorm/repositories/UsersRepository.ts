import { getRepository, Not, Repository } from 'typeorm';

import User from '../entities/User';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';

import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import FindAllProvidersDTO from '@modules/users/dtos/FindAllProvidersDTO';

class UsersRepository implements UsersRepositoryInterface {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findAllProviders({
    except_user_id,
  }: FindAllProvidersDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async create({ email, name, password }: CreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create({ email, name, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
