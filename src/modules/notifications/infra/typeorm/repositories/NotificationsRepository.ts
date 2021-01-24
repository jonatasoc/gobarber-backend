import { getMongoRepository, MongoRepository } from 'typeorm';

import CreateNotificationDTO from '@modules/notifications/dtos/CreateNotificationDTO';

import AppointmentsRepositoryInterface from '@modules/notifications/repositories/NotificationRepositoryInterface';
import Notification from '../schemas/Notification';

class NotificationsRepository implements AppointmentsRepositoryInterface {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
