import { Router } from 'express';

import AuthenticateUserSessions from '../services/AuthenticateUserService';

const sessionsRouter = Router();

/**
 * Repositories
 * Services
 */

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserSessions();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
