import handlebars from 'handlebars';
import fs from 'fs';

import MailTemplateProviderInterface from '../models/MailTemplateProviderInterface';
import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';

export default class HandlebardMailTemplateProvider implements MailTemplateProviderInterface {
  public async parse({ file, variables }: ParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
