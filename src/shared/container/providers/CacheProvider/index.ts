import { container } from 'tsyringe';
import CacheProviderInterface from './models/CacheProviderInterface';
import RedisCashProvider from './implementations/RedisCacheProvider';

const providers = {
  redis: RedisCashProvider,
};

container.registerSingleton<CacheProviderInterface>(
  'CacheProvider',
  providers.redis
);
