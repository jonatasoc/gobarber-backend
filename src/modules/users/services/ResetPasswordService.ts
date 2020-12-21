import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';

// import User from '../infra/typeorm/entities/User';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import UserTokensInterface from '../repositories/UserTokensInterface';
import AppError from '@shared/errors/AppError';
import HashProviderInterface from '../providers/HashProvider/models/HashProviderInterface';

// import AppError from '@shared/errors/AppError';

interface Request {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,

    @inject('UserTokensRepository')
    private userTokensRepository: UserTokensInterface,

    @inject('HashProvider')
    private hashProvider: HashProviderInterface
  ) {}

  public async execute({ token, password }: Request): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;

    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
