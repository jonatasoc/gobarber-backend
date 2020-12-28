import SendMailDTO from '../dtos/SendMailDTO';

export default interface MailProviderInterface {
  sendMail(data: SendMailDTO): Promise<void>;
}
