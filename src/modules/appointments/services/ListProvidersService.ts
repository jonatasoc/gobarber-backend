import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';

import CacheProviderInterface from '@shared/container/providers/CacheProvider/models/CacheProviderInterface';

interface Request {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,

    @inject('CacheProvider')
    private cacheProvider: CacheProviderInterface
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`
    );

    await this.cacheProvider.invalidate(`providers-list:${user_id}`);

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      await this.cacheProvider.save(`providers-list:${user_id}`, users);
    }

    return users;
  }
}

export default ListProvidersService;
