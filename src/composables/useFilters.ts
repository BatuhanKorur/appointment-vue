import { reactive, ref } from 'vue'
import { type Appointment } from '@/types'
export function useAppointmentsFilter() {
  const filters = reactive({
    status: ref<string>('All'),
    agents: ref<string[]>([]),
    query: ref<string>(''),
    startDate: ref<string>(''),
    endDate: ref<string>(''),
  })

  /**
   * Filters the given list of appointments based on the current filter criteria.
   * @param items - The list of appointments to be filtered.
   * @returns The filtered list of appointments.
   */
  const filterAppointments = (items: Appointment[]): Appointment[] => {
    let f: Appointment[] = []

    /**
     * Filters the appointments based on selected agents
     */
    if (0 < filters.agents.length) {
      for (const apt of items) {
        if (apt.agents.every((agent) => filters.agents.includes(agent))) {
          f.push(apt)
        }
      }
    } else {
      f = items
    }

    /**
     * Filter by Start Date
     * If a start date is specified, only appointments with an appointment date greater than or equal to the start date will be included.
     */
    if (filters.startDate) {
      f = f.filter((appointment) => new Date(appointment.appointment_date) >= new Date(filters.startDate))
    }

    /**
     * Filter by End Date
     * If an end date is specified, only appointments with an appointment date less than or equal to the end date will be included.
     */
    if (filters.endDate) {
      f = f.filter((appointment) => new Date(appointment.appointment_date) <= new Date(filters.endDate))
    }

    /**
     * Filter by Search Query
     * @description If a query is defined, appointments with an address or contact string containing the query
     * (case-insensitive) will be included.
     */
    if (filters.query) {
      f = f.filter((appointment) =>
        appointment.address.toLowerCase().includes(filters.query.toLowerCase())
        || appointment.contact_str[0].toLowerCase().includes(filters.query.toLowerCase()),
      )
    }

    /**
     * Filters the appointments based on the status field.
     * If a status is specified in the filters, and it's not "All", only appointments with the specified status will be included.
     */
    if ('All' !== filters.status) {
      f = f.filter((appointment) => appointment.status === filters.status)
    }

    return f
  }
  return {
    filters,
    filterAppointments,
  }
}
