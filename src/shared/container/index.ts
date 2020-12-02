import { container } from 'tsyringe';

import AppointmentsRepositoryInterface from '@modules/appointments/repositories/AppointmentsRepositoryInterface';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import UsersRepositoryInterface from '@modules/users/repositories/UsersRepositoryInterface';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// registerSingleton cria a instância apenas uma vez durante todo o ciclo de vida de nossa aplicação, diferente do método register
// que cria uma nova instância sempre que é chamado.
container.registerSingleton<AppointmentsRepositoryInterface>(
  'AppointmentsRepository',
  AppointmentsRepository
);
container.registerSingleton<UsersRepositoryInterface>('UsersRepository', UsersRepository);
