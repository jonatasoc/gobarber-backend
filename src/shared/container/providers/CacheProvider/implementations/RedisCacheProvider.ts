import CacheProviderInterface from '../models/CacheProviderInterface';
import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';

export default class CacheProvider implements CacheProviderInterface {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    this.client.del(key);
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    // We're saving the cache with the key format prefix:key. So here we have one way to invalidate all
    // the related prefixs
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = await this.client.pipeline();

    keys.forEach(key => pipeline.del(key));

    await pipeline.exec();
  }
}
