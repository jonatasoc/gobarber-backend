import CreateAppointmentService from './CreateAppointmentService';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

// describe criar como uma "Categoria para os testes"
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '134134134134',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('134134134134');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '134134134134',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '134134134134',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
