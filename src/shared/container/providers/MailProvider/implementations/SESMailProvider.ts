import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import aws from 'aws-sdk';

import MailTemplateProviderInterface from '../../MailTemplateProvider/models/MailTemplateProviderInterface';
import SendMailDTO from '../dtos/SendMailDTO';
import MailProviderInterface from '../models/MailProviderInterface';

import mailConfig from '@config/mail';

@injectable()
export default class SESMailProvider implements MailProviderInterface {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: MailTemplateProviderInterface
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: SendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject: 'Recuperação de senha',
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
