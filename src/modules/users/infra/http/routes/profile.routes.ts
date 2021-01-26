import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const profileRoute = Router();
/**
 * Repositories
 * Services
 */

const profileController = new ProfileController();

profileRoute.use(ensureAuthenticated);

profileRoute.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update
);
profileRoute.get('/', profileController.show);

export default profileRoute;
