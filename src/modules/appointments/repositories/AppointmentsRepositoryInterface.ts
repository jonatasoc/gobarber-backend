import Appointment from '../infra/typeorm/entities/Appointment';
import CreateAppointmentDTO from '../dtos/CreateAppointmentDTO';
import FindAllMonthFromProviderDTO from '../dtos/FindAllMonthFromProviderDTO';

export default interface AppointmentsRepositoryInterface {
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: FindAllMonthFromProviderDTO
  ): Promise<Appointment[]>;
}
