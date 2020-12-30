import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserMap from '@modules/users/dtos/UserMap';
// startOfHour vai pegar a hora passada e colocar minuto e segundos como 0, deixando apenas a hora
// pasrseISO vai converter um formato String para um formato Date

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const mappedUser = UserMap.toDTO(user);

    return response.json({ mappedUser, token });
  }
}
