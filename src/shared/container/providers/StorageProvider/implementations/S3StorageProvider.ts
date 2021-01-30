import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';

import uploadconfig from '@config/upload';

import StorageProviderInterface from '../models/SotareProviderInterface';

class DiskStorageProvider implements StorageProviderInterface {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-2',
    });
  }
  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadconfig.tempFolder, file);

    const fileContent = await fs.promises.readFile(originalPath, {
      encoding: 'utf-8',
    });

    await this.client
      .putObject({
        Bucket: 'app-gobarber-jonatasoc',
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
      })
      .promise();

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

export default DiskStorageProvider;
