import { default as AirtableJs } from 'airtable'
import type { Agent, Appointment, Contact } from '@/types'
import { Tables } from '@/types'

// extends airtable record which includes common properties
type FieldSet = Agent & Contact & Appointment

const base = new AirtableJs({
  apiKey: import.meta.env.VITE_AIRTABLE_API,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID)

const Airtable = {
  getAll: async function(table: Tables) {
    const data: FieldSet[] = []
    await base(table).select().eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        // Quick work around to fix typescript error on airtable Fieldset
        // Maybe should switch to airtable-ts library for better typescript support
        // https://www.npmjs.com/package/airtable-ts
        const f = record.fields as FieldSet
        f.field_id = record.id
        data.push(f)
      })
      fetchNextPage()
    })
    return data
  },

  getContact: async function(contactId: string) {
    const record = await base(Tables.CONTACTS).find(contactId)
    return record?.fields as Contact
  },

  getAgent: async function(agentId: string) {
    const record = await base(Tables.AGENTS).find(agentId)
    return record?.fields as Agent
  },

  createAppointment: async function(appointment: Appointment) {
    try {
      return await base(Tables.APPOINTMENTS).create([
        {
          fields: {
            appointment_date: appointment.appointment_date,
            status: appointment.status,
            address: appointment.address,
            contact: [appointment.contact[0]],
          },
        },
      ], { typecast: true })
    } catch (error) {
      return new Error('Failed to create appointment')
    }
  },

  updateAppointment: async function(appointment: Appointment) {
    try {
      return await base(Tables.APPOINTMENTS).update([
        {
          id: appointment.field_id,
          fields: {
            appointment_date: appointment.appointment_date,
            status: appointment.status,
            address: appointment.address,
            contact: [appointment.contact[0]],
          },
        },
      ], { typecast: true })
    } catch (error) {
      return new Error('Failed to update appointment')
    }
  },
}

export default Airtable
