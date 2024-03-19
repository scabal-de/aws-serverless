export interface AppointmentFieldsRequired {
  readonly idMedic: string;
  readonly isSpeciality: string;
  readonly idAgenda: string;
  readonly pacientName: string;
  readonly pacientLastName: string;
  readonly pacientPhone: string;
  readonly countryISO: string;
  readonly status: number;
}

export type FieldsRequired = Required<AppointmentFieldsRequired>;

export class Appointment {
  readonly idMedic: string;
  readonly isSpeciality: string;
  readonly idAgenda: string;
  readonly pacientName: string;
  readonly pacientLastName: string;
  readonly pacientPhone: string;
  readonly countryISO: string;
  status: number;

  constructor(properties: FieldsRequired) {
    Object.assign(this, properties);
  }
}
