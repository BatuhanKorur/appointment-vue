import axios from 'axios'
type Tables = 'Agents' | 'Contacts' | 'Appointments'

const AirtableService = {
  URL: `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}`,
  HEADERS: {
    Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API}`,
  },

  /**
   * Retrieves all records from the specified Airtable table.
   * @param {Tables} table - The table to retrieve records from.
   */
  async getAll(table: Tables) {
    const response = await axios.get(
      `${this.URL}/${table}`,
      {
        headers: { ...this.HEADERS },
      },
    )
    return response.data.records.map((record) => ({
      field_id: record.id,
      ...record.fields,
    }))
  },

  /**
   * Creates a new appointment in the Airtable database.
   *
   * @param {object} formData - The data to create the appointment with.
   */
  async createAppointment(formData: object) {
    const response = await axios.post(
      `${this.URL}/Appointments`,
      {
        records: [
          {
            fields: {
              ...formData,
            },
          },
        ],
        typecast: true,
      },
      {
        headers: { ...this.HEADERS },
      },
    )
    return {
      field_id: response.data.records[0].id,
      ...response.data.records[0].fields,
    }
  },

  /**
   * Updates an existing appointment in the Airtable database.
   *
   * @param {string} fieldId - The ID of the appointment to update.
   * @param {object} formData - The data to update the appointment with.
   */
  async updateAppointment(fieldId: string, formData: object) {
    const response = await axios.put(
      `${this.URL}/Appointments`,
      {
        records: [
          {
            id: fieldId,
            fields: { ...formData },
          },
        ],
        typecast: true,
      },
      {
        headers: { ...this.HEADERS },
      },
    )

    return {
      field_id: response.data.records[0].id,
      ...response.data.records[0].fields,
    }
  },
}

export default AirtableService
