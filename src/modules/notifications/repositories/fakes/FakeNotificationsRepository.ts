import { ObjectID } from 'mongodb';
import CreateNotificationDTO from '@modules/notifications/dtos/CreateNotificationDTO';

import AppointmentsRepositoryInterface from '@modules/notifications/repositories/NotificationRepositoryInterface';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class NotificationsRepository implements AppointmentsRepositoryInterface {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;
