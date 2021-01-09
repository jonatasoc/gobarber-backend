import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
// import { getDate, getDaysInMonth } from 'date-fns';

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
    return [{ hour: 8, available: true }];
  }
}

export default ListProviderDayAvailabilityService;
