import { getRepository } from 'typeorm';

// import { hash } from 'bcryptjs';

import User from '../models/User';
import { compare } from 'bcryptjs';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticateUserSessions {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    // user.password - Senha criptografada, vinda do Banco
    // password - Senha não criptografada, vinda da Requisição
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    return {
      user,
    };
  }
}

export default AuthenticateUserSessions;
