import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';

export default interface MailTemplateProviderInterface {
  parse(data: ParseMailTemplateDTO): Promise<string>;
}
