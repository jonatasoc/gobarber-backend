import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import StorageProviderInterface from './models/SotareProviderInterface';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: container.resolve(DiskStorageProvider),
  s3: container.resolve(S3StorageProvider),
};

container.registerInstance<StorageProviderInterface>(
  'StorageProvider',
  providers[uploadConfig.driver]
);
