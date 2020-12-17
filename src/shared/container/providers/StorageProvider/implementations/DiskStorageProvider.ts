import fs from 'fs';
import path from 'path';

import uploadconfig from '@config/upload';

import StorageProviderInterface from '../models/SotareProviderInterface';

class DiskStorageProvider implements StorageProviderInterface {
  public async saveFile(file: string): Promise<string> {
    // rename é a forma de mover arquivos no Node
    await fs.promises.rename(
      path.resolve(uploadconfig.tempFolder, file),
      path.resolve(uploadconfig.uploadsFolder, 'uploads', file)
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadconfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
