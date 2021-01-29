import { container } from 'tsyringe';
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';
import MailTemplateProviderInterface from './models/MailTemplateProviderInterface';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<MailTemplateProviderInterface>(
  'MailTemplateProvider',
  providers.handlebars
);
