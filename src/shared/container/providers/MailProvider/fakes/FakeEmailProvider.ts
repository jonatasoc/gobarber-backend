import SendMailDTO from '../dtos/SendMailDTO';
import MailProviderInterface from '../models/MailProviderInterface';

export default class FakeMailProvider implements MailProviderInterface {
  private messages: SendMailDTO[] = [];

  public async sendMail(message: SendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
