import { ref } from 'vue'
/**
 * Validates the provided appointment form.
 * @param form - The appointment form object containing contact, agents, address, and appointment_date fields.
 * @returns A boolean value indicating whether the form is valid or not.
 */
export default function useValidation() {
  const errors = ref({})
  const validateAppointment = (form: {
    contact: string[]
    agents: string[]
    address: string
    appointment_date: string
  }): boolean => {
    errors.value = {}
    if (0 === form.contact.length) {
      errors.value.contact = 'Please select at least one contact.'
    }
    if (0 === form.agents.length) {
      errors.value.agents = 'Please select at least one agent.'
    }
    if (0 === form.address.trim().length) {
      errors.value.address = 'Please enter an address.'
    }
    if (0 === form.appointment_date.trim().length) {
      errors.value.appointment_date = 'Please select an appointment date.'
    }
    return !Object.keys(errors.value).length
  }
  return {
    errors,
    validateAppointment,
  }
}
