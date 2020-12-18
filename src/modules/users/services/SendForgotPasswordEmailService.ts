import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

// import User from '../infra/typeorm/entities/User';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';

interface Request {
  email: string;
}

@injectable()
class SendForgotEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepositoryInterface
  ) {}

  public async execute(): Promise<void> {}
}

export default SendForgotEmailService;
