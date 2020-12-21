import { getRepository, Repository } from 'typeorm';

import UserToken from '../entities/UserToken';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';

import UserTokensInterface from '@modules/users/repositories/UserTokensInterface';

class UserTokensRepository implements UserTokensInterface {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findById(id: string): Promise<UserToken | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<UserToken | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create({ email, name, password }: CreateUserDTO): Promise<UserToken> {
    const user = await this.ormRepository.create({ email, name, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: UserToken): Promise<UserToken> {
    return this.ormRepository.save(user);
  }
}

export default UserTokensRepository;
