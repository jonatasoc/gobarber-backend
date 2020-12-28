import handlebars from 'handlebars';

import MailTemplateProviderInterface from '../models/MailTemplateProviderInterface';
import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';

export default class HandlebardMailTemplateProvider implements MailTemplateProviderInterface {
  public async parse({ template, variables }: ParseMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
