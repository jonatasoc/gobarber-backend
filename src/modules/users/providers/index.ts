import { container } from 'tsyringe';

import HashProviderInterface from './HashProvider/models/HashProviderInterface';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<HashProviderInterface>('HashProvider', BCryptHashProvider);
