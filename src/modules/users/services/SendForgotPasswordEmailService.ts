import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

// import User from '../infra/typeorm/entities/User';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import MailProviderInterface from '@shared/container/providers/MailProvider/models/MailProviderInterface';
import UserTokensInterface from '../repositories/UserTokensInterface';
import AppError from '@shared/errors/AppError';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface,

    @inject('MailProvider')
    private mailProvider: MailProviderInterface,

    @inject('UserTokensRepository')
    private userTokensRepository: UserTokensInterface
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido');
  }
}

export default SendForgotPasswordEmailService;
