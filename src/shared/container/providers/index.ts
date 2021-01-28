import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import StorageProviderInterface from './StorageProvider/models/SotareProviderInterface';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

import MailProviderInterface from './MailProvider/models/MailProviderInterface';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';

import MailTemplateProviderInterface from './MailTemplateProvider/models/MailTemplateProviderInterface';
import MailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

// import MailProviderInterface from './MailProvider/models/MailProviderInterface';

container.registerSingleton<StorageProviderInterface>(
  'StorageProvider',
  DiskStorageProvider
);
container.registerSingleton<MailTemplateProviderInterface>(
  'MailTemplateProvider',
  MailTemplateProvider
);

container.registerInstance<MailProviderInterface>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider)
);
