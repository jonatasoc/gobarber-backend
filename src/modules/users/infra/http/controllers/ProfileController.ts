import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import UserMap from '@modules/users/dtos/UserMap';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    // To remove user.password on response
    const mappedUser = UserMap.toDTO(user);

    return response.json(mappedUser);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name, email, password, old_password } = request.body;

      const updateProfile = container.resolve(UpdateProfileService);

      const user = await updateProfile.execute({
        user_id,
        name,
        email,
        old_password,
        password,
      });

      // Deletando as informações do password para não aparecer no retorno da rota.
      const mappedUser = UserMap.toDTO(user);

      return response.json(mappedUser);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
