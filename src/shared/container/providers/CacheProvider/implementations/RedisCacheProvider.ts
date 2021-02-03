import CacheProviderInterface from '../models/CacheProviderInterface';
import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

export default class CacheProvider implements CacheProviderInterface {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    console.log(key, value);
  }

  public async invalidate(key: string): Promise<void> {}

  public async recover(key: string): Promise<void> {}
}
