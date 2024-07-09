export enum Tables {
  APPOINTMENTS = 'Appointments',
  AGENTS = 'Agents',
  CONTACTS = 'Contacts',
}

export enum Statuses {
  CANCELLED = 'Cancelled',
  UPCOMING = 'Upcoming',
  COMPLETED = 'Completed',
}

export type { Agent } from './Agent.ts'
export type { Contact } from './Contact.ts'
export type { Appointment } from './Appointment.ts'
