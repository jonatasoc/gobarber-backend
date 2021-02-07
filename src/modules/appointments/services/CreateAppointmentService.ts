import 'reflect-metadata';
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';

import AppError from '@shared/errors/AppError';
import AppointmentsRepositoryInterface from '../repositories/AppointmentsRepositoryInterface';
import NotificationRepositoryInterface from '@modules/notifications/repositories/NotificationRepositoryInterface';
import CacheProviderInterface from '@shared/container/providers/CacheProvider/models/CacheProviderInterface';

interface Request {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepositoryInterface,

    @inject('NotificationsRepository')
    private notificationsRepository: NotificationRepositoryInterface,

    @inject('CacheProvider')
    private cacheProvider: CacheProviderInterface
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment at an ealier date");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create appointments between 8am and 5pm'
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormatted}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'YYYY-M-d'
      )}`
    );

    return appointment;
  }
}

export default CreateAppointmentService;
