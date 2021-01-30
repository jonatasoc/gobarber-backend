import { container } from 'tsyringe';

import StorageProviderInterface from './models/SotareProviderInterface';
import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  providers.s3
);
