import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRoute = Router();
/**
 * Repositories
 * Services
 */

const profileController = new ProfileController();

profileRoute.use(ensureAuthenticated);

profileRoute.put('/', profileController.update);
profileRoute.get('/', profileController.show);

export default profileRoute;
