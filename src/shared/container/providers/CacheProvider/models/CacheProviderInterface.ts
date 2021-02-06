import { string } from '@hapi/joi';

export default interface CacheProviderInterface {
  save(key: string, value: any): Promise<void>;
  recover<T>(key: string): Promise<string | null>;
  invalidate(key: string): Promise<void>;
}