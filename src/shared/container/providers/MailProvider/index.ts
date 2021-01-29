import { container } from 'tsyringe';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';
import MailProviderInterface from './models/MailProviderInterface';
import mailConfig from '@config/mail';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<MailProviderInterface>(
  'MailProvider',
  providers[mailConfig.driver]
);
