import CashProviderInterface from '../models/CashProviderInterface';
import Redis, { Redis as RedisClient } from 'ioredis';

export default class CashProvider implements CashProviderInterface {
  private client: RedisClient;

  constructor() {
    this.client = new Redis();
  }

  save(key: string, value: string): Promise<void> {}

  invalidate(key: string): Promise<void> {}

  recover(key: string): Promise<void> {}
}
