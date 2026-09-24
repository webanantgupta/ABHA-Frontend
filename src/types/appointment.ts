
export interface AppointmentFee {
  name: string;
  amount: number;
  selected: boolean;
}

export interface Appointment {
  appointment_id: number;

  patient_name: string;
  mrn: string;
  age: number;
  gender: string;
  phone: string;

  doctor_name: string;

  authorized_by: string;

  appointment_date: string;
  time_slot: string;

  priority: string;

  discount: number;

  fees: AppointmentFee[];

  created_at: string;
  updated_at: string;
}
