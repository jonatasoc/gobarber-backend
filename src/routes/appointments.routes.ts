import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
// startOfHour vai pegar a hora passada e colocar minuto e segundos como 0, deixando apenas a hora
// pasrseISO vai converter um formato String para um formato Date

const appointmentsRouter = Router();

const appointmentsReposistory = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsReposistory.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsReposistory
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
