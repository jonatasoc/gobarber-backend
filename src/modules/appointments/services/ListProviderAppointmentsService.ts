import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';

import AppointmentsRepositoryInterface from '../repositories/AppointmentsRepositoryInterface';
import CacheProviderInterface from '@shared/container/providers/CacheProvider/models/CacheProviderInterface';

// import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepositoryInterface,

    @inject('CacheProvider')
    private cacheProvider: CacheProviderInterface
  ) {}

  public async execute({
    provider_id,
    day,
    year,
    month,
  }: Request): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey
    );

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        {
          provider_id,
          day,
          year,
          month,
        }
      );

      await this.cacheProvider.save(cacheKey, appointments);
    }

    return appointments;
  }
}

export default ListProviderAppointmentsService;
