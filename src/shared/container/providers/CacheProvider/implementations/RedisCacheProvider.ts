import CacheProviderInterface from '../models/CacheProviderInterface';
import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

export default class CacheProvider implements CacheProviderInterface {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover(key: string): Promise<string | null> {
    const data = await this.client.get(key);

    return data;
  }

  public async invalidate(key: string): Promise<void> {}
}
