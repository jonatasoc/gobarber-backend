import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
// startOfHour vai pegar a hora passada e colocar minuto e segundos como 0, deixando apenas a hora
// pasrseISO vai converter um formato String para um formato Date

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsReposistory = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsReposistory.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
