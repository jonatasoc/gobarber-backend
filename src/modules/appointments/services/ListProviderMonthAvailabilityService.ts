import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  user_id: string;
  month: number;
  year: number;
}

type Response = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor() {}

  public async execute({ user_id, year, month }: Request): Promise<Response> {
    return [{ day: 1, available: false }];
  }
}

export default ListProviderMonthAvailabilityService;
