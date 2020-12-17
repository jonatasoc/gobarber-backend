import fs from 'fs';
import path from 'path';

import StorageProviderInterface from '../models/SotareProviderInterface';

class DiskStorageProvider implements StorageProviderInterface {
  public async saveFile(file: string): Promise<string> {
    // rename é a forma de mover arquivos no Node
    await fs.promises.rename();
  }

  public async deleteFile(file: string): Promise<void> {}
}
