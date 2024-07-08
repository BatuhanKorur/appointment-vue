import { default as AirtableJs } from 'airtable'
import type { Agent, Contact } from '@/types'

const base = new AirtableJs({
  apiKey: import.meta.env.VITE_AIRTABLE_API,
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID)

const Airtable = {
  fetchFromBase: async function(tableName: string) {
    const data = []
    await base(tableName).select().eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        data.push(record.fields)
      })
      fetchNextPage()
    })
    return data
  },

  getContacts: async function() {
    const contacts: Contact[] = this.fetchFromBase('Contacts')
    return contacts
  },

  getAgents: async() => {
    const data: Agent[] = []
    await base('Agents').select().eachPage((records, fetchNextPage) => {
      records.forEach((record) => {
        data.push(record.fields)
      })
      fetchNextPage()
    })
    return data
  },
}

export default Airtable
