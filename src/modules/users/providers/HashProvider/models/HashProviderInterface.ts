export default interface HashProviderInterface {
  generateHash(payload: string): Promise<string>;
  comparteHash(payload: string, hashed: string): Promise<boolean>;
}
