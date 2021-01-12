import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import AppointmentsRepositoryInterface from '../repositories/AppointmentsRepositoryInterface';

// import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type Response = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepositoryInterface
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: Request): Promise<Response> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      }
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (__, index) => index + hourStart
    );

    const currentDate = new Date(Date.now());
    console.log(currentDate);

    const availability = eachHourArray.map(hour => {
      const hasAppointmentsInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      );

      console.log(hasAppointmentsInHour);

      const compareDate = new Date(year, month + 1, day, hour);

      console.log(isAfter(compareDate, currentDate));

      return {
        hour,
        available: !hasAppointmentsInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
