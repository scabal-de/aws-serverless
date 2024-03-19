import { AppointmentApplication } from "./application/appointment.application";
import { AppointmentController } from "./adapters/controllers/appointment.controller";
import { AppointmentRepository } from "./domain/repositories/appointment.repository";
import { AppointmentInfrastructure } from "./infrastructure/appointment.infrastructure";
import { Appointment, FieldsRequired } from "./domain/appointment";
import joi from "joi";
import { BusinessError } from "./helpers/errors.helper";

const repository: AppointmentRepository = new AppointmentInfrastructure();
const application: AppointmentApplication = new AppointmentApplication(
  repository,
);
const controller: AppointmentController = new AppointmentController(
  application,
);

export const appointmentHandler = async (event: any) => {
  const body = event.body;
  // const body = JSON.parse(event.body);

  const schema = joi.object({
    idMedic: joi.string().required(),
    isSpeciality: joi.string().required(),
    idAgenda: joi.string().required(),
    pacientName: joi.string().required(),
    pacientLastName: joi.string().required(),
    pacientPhone: joi.string().required(),
    countryISO: joi.string().required(),
  });

  const validateResult: joi.ValidationResult<any> = schema.validate(body);

  if (validateResult.error) {
    throw new BusinessError(
      validateResult.error.stack!,
      validateResult.error.message,
      411,
    );
  }

  const properties: FieldsRequired = {
    idMedic: body.IdMedic,
    isSpeciality: body.isSpeciality,
    idAgenda: body.idAgenda,
    pacientName: body.pacientName,
    pacientLastName: body.pacientLastName,
    pacientPhone: body.pacientPhone,
    countryISO: body.countryISO,
    status: 0,
  };

  const appointment: Appointment = new Appointment(properties);
  console.log(
    "🚀 ~ appointmentHandler ~ appointment:",
    JSON.stringify(appointment),
  );
  const result = controller.create(appointment);
  console.log("🚀 ~ appointmentHandler ~ result:", JSON.stringify(result));

  return {
    statusCode: 200,
    body: result,
  };
};
