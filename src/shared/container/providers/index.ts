import { container } from 'tsyringe';

import StorageProviderInterface from './StorageProvider/models/SotareProviderInterface';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import './MailProvider';
// import MailProviderInterface from './MailProvider/models/MailProviderInterface';

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  DiskStorageProvider
);
