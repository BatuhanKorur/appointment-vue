import { default as AirtableJs } from 'airtable'
import type { Agent, Contact, Appointment } from '@/types'
import { Tables } from '@/types'

// extends airtable record which includes common properties
type FieldSet = Agent & Contact & Appointment

const base = new AirtableJs({
  apiKey: import.meta.env.VITE_AIRTABLE_API,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID)

const Airtable = {
  getAll: async function(table: Tables) {
    const data: FieldSet[] = []

    await base(table).select({
      view: 'Grid view',
    }).eachPage((records, fetchNextPage) => {
      records.forEach(({ fields }) => {
        // Quick work around to fix typescript error on airtable Fieldset
        // Maybe should switch to airtable-ts library for better typescript support
        // https://www.npmjs.com/package/airtable-ts
        const f = fields as FieldSet
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
}

export default Airtable
