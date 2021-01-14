import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';

import AppointmentsRepositoryInterface from '../repositories/AppointmentsRepositoryInterface';

// import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepositoryInterface
  ) {}

  public async execute({
    provider_id,
    day,
    year,
    month,
  }: Request): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        year,
        month,
      }
    );
  }
}

export default ListProviderMonthAvailabilityService;
