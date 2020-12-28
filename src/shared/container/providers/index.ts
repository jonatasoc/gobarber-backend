import { container } from 'tsyringe';

import StorageProviderInterface from './StorageProvider/models/SotareProviderInterface';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import MailProviderInterface from './MailProvider/models/MailProviderInterface';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import MailTemplateProviderInterface from './MailTemplateProvider/models/MailTemplateProviderInterface';
import MailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

// import MailProviderInterface from './MailProvider/models/MailProviderInterface';

container.registerSingleton<StorageProviderInterface>('StorageProvider', DiskStorageProvider);
container.registerSingleton<MailTemplateProviderInterface>(
  'MailTemplateProvider',
  MailTemplateProvider
);

container.registerInstance<MailProviderInterface>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
);
