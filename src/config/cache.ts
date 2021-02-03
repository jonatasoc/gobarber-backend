import { RedisOptions } from 'ioredis';

interface CacheConfigInterface {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',

  config: {
    redis: {
      host: 'localhost',
      port: 6379,
      paswword: undefined,
    },
  },
} as CacheConfigInterface;
