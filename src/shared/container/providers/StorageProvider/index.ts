import { container } from 'tsyringe';

import StorageProviderInterface from './models/SotareProviderInterface';
import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  providers.disk
);
