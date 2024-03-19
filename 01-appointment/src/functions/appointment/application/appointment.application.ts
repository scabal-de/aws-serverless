import { Appointment } from "../domain/appointment";
import { AppointmentRepository } from "../domain/repositories/appointment.repository";
import {
  Factory,
  FactoryAR,
  FactoryCO,
  FactoryMX,
} from "../infrastructure/appointment.factory";

export class AppointmentApplication {
  constructor(private appointmentRepository: AppointmentRepository) {}

  create(appointment: Appointment) {
    let factory: Factory;

    switch (appointment.countryISO) {
      case "MX":
        factory = new FactoryMX();
        break;
      case "CO":
        factory = new FactoryCO();
        break;
      case "AR":
        factory = new FactoryAR();
        break;

      default:
        factory = new FactoryMX();
        break;
    }
    return this.appointmentRepository.create(appointment, factory);
  }
}
