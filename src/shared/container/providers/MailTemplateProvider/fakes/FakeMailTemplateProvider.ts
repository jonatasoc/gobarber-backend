import MailTemplateProviderInterface from '../models/MailTemplateProviderInterface';
import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';

export default class FakeMailTemplateProvider implements MailTemplateProviderInterface {
  public async parse({ template }: ParseMailTemplateDTO): Promise<string> {
    return template;
  }
}
