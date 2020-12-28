import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import path from 'path';

// import User from '../infra/typeorm/entities/User';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import MailProviderInterface from '@shared/container/providers/MailProvider/models/MailProviderInterface';
import UserTokensInterface from '../repositories/UserTokensInterface';
import AppError from '@shared/errors/AppError';
import SendMailDTO from '@shared/container/providers/MailProvider/dtos/SendMailDTO';

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

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarger] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
