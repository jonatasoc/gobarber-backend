import { Router } from 'express';

import AuthenticateUserSessions from '../services/AuthenticateUserService';

const sessionsRouter = Router();

/**
 * Repositories
 * Services
 */

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserSessions();

    const { user } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
