<script setup lang="ts">
import { onMounted, reactive, ref, type PropType, computed } from 'vue'
import { type Contact, Status } from '@/types'
import AirtableService from '@/services/AirtableService'
import useValidation from '@/composables/useValidations'
import { dateUtils } from '@/utils'
// UI Components
import TextInput from '@/components/form/TextInput.vue'
import SearchPerson from '@/components/form/SearchPerson.vue'
import DateInput from '@/components/form/DateInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import ErrorBox from '@/components/form/ErrorBox.vue'
import SelectInput from '@/components/form/SelectInput.vue'

/**
 * @param data - The appointment data to be edited or saved.
 * @param action - The type of form operation: 'create' or 'edit'.
 * @param agents - An array of agent objects.
 * @param contacts - An array of contact objects.
 */
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  action: {
    type: String as PropType<'create' | 'edit'>,
    required: true,
  },
  agents: {
    type: Array as PropType<Contact[]>,
  },
  contacts: {
    type: Array as PropType<Contact[]>,
  },
})
const emits = defineEmits(['update'])

// Reactive form state
const form = reactive({
  appointment_date: '',
  address: '',
  status: 'Upcoming',
  contact: [],
  agents: [],
})

/**
 * onMounted hook that initializes the form data based on the provided props.
 * @description Initialized the form data from provider data. If editing, pre-fills the form with the provided data.
 */
onMounted(() => {
  if (Object.keys(props.data).length) {
    form.appointment_date = props.data.appointment_date
    form.address = props.data.address
    form.contact = props.contacts.filter((contact) => contact.field_id === props.data.contact[0])
    form.agents = props.agents.filter((agent) => props.data.agents.includes(agent.field_id))
    form.status = props.data.status
  }
})

/**
 * Prepares the form data for airtable.
 * @returns {Object} - An object containing the form data ready for saving or editing an appointment.
 */
function prepareForm() {
  return {
    appointment_date: form.appointment_date,
    address: form.address,
    status: form.status,
    agents: form.agents.map((agent) => agent.field_id),
    contact: form.contact.map((contact) => contact.field_id),
  }
}

/**
 * onSubmit function is responsible for handling the form submission.
 * It first validates the form using the `validateAppointment` function.
 * If the form is valid, it prepares the form data using the `prepareForm` function.
 * Depending on the form type (create or edit), it either creates a new appointment or updates an existing one using the `AirtableService`.
 * Upon successful operation, it emits an 'update' or 'create' event with the updated/created data.
 *
 * @returns {Promise} - A promise that resolves when the form is successfully submitted.
 */
const submitting = ref(false)
const { errors, validateAppointment } = useValidation()

async function onSubmit() {
  if (!validateAppointment(form)) {
    return
  }

  submitting.value = true
  const fields = prepareForm()
  let response
  try {
    response = 'create' === props.action
      ? await AirtableService.createAppointment(fields)
      : await AirtableService.updateAppointment(props.data.field_id, fields)
  } catch (error) {
    console.error('Error occurred while saving appointment:', error)
    submitting.value = false
    return
  } finally {
    submitting.value = false
    let msg = 'create' === props.action ? 'Appointment created successfully!' : 'Appointment updated successfully!'
    emits('update', props.action, msg, response)
  }
}

const StatusOptions = computed(() => {
  return dateUtils.datePassed(form.appointment_date)
    ? [Status.Completed, Status.Cancelled]
    : [Status.Completed, Status.Cancelled]
})
</script>

<template>
  <div class="space-y-5">
    <div>
      <label>Contact</label>
      <SearchPerson :data="contacts" person-type="contact" v-model="form.contact"/>
      <Transition name="fade" mode="out-in">
        <ErrorBox v-if="errors.contact" :msg="errors.contact"/>
      </Transition>
    </div>
    <div>
      <label>Address</label>
      <TextInput type="address" v-model="form.address" placeholder="Enter address"/>
      <Transition name="fade" mode="out-in">
        <ErrorBox v-if="errors.address" :msg="errors.address"/>
      </Transition>
    </div>
    <div>
      <label>Agents</label>
      <SearchPerson :data="agents"
                    person-type="agent"
                    v-model="form.agents"
                    multiple/>
      <Transition name="fade" mode="out-in">
        <ErrorBox v-if="errors.agents" :msg="errors.agents"/>
      </Transition>
    </div>
    <div>
      <label>Appointment Date</label>
      <DateInput v-model="form.appointment_date"/>
      <Transition name="fade" mode="out-in">
        <ErrorBox v-if="errors.appointment_date" :msg="errors.appointment_date"/>
      </Transition>
    </div>
    <div v-if="action === 'edit'">
      <label>Status</label>
      <SelectInput :options="StatusOptions"
                   v-model="form.status"
      />
    </div>
    <div>
      <div class="f-between space-x-3">
        <Transition name="fade" mode="out-in">
          <div>
            <div v-if="submitting"
                 class="size-full grow animate-pulse rounded-xl border border-blue-950/5 bg-blue-100 px-4 py-2.5">
              <p class="text-sm font-medium text-blue-950">Submitting... Please wait</p>
            </div>
          </div>
        </Transition>
        <BaseButton :label="action === 'create' ? 'Save' : 'Edit'" @click="onSubmit" class="shrink-0 px-6 py-3">
          {{ action === 'create' ? 'Create Appointment' : 'Update Record' }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
label {
  @apply pb-1 pl-0.5 text-sm font-medium text-grey-500;
}
</style>
