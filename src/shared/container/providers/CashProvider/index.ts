import { container } from 'tsyringe';
import CashProviderInterface from './models/CashProviderInterface';
import RedisCashProvider from './implementations/RedisCashProvider';

const providers = {
  redis: RedisCashProvider,
};

container.registerSingleton<CashProviderInterface>(
  'RedisCashProvider',
  providers.redis
);
