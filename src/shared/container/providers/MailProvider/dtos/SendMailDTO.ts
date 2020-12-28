import ParseMailTemplateDTO from '../../MailTemplateProvider/dtos/ParseMailTemplateDTO';

interface MailContent {
  name: string;
  email: string;
}

export default interface SendMailDTO {
  to: MailContent;
  from?: MailContent;
  subject: string;
  templateData: ParseMailTemplateDTO;
}
