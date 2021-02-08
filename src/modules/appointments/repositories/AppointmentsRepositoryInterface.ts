import Appointment from '../infra/typeorm/entities/Appointment';
import CreateAppointmentDTO from '../dtos/CreateAppointmentDTO';
import FindAllMonthFromProviderDTO from '../dtos/FindAllMonthFromProviderDTO';
import FindAllInDayFromProviderDTO from '../dtos/FindAllInDayFromProviderDTO';

export default interface AppointmentsRepositoryInterface {
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: FindAllMonthFromProviderDTO
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: FindAllInDayFromProviderDTO
  ): Promise<Appointment[]>;
}
