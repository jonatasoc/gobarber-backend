import { string } from '@hapi/joi';

export default interface CashProviderInterface {
  save(key: string, value: string): Promise<void>;
  recover(key: string): Promise<void>;
  invalidate(key: string): Promise<void>;
}
