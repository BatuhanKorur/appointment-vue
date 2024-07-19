<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue'
import { toast } from 'vue3-toastify'
import { IconCirclePlus } from '@tabler/icons-vue'
import { type Appointment, type Agent, type Contact } from '@/types'
import usePagination from '@/composables/usePagination'
import { useAppointmentsFilter } from '@/composables/useFilters'
import AirtableService from '@/services/AirtableService'

// Table Components
import AppointmentFilters from '@/components/AppointmentFilters.vue'
import TableView from '@/components/table/TableView.vue'
import TableRow from '@/components/table/TableRow.vue'
import TableColumn from '@/components/table/TableColumn.vue'
import Pagination from '@/components/table/Pagination.vue'

// Table Column Components
import ContactItem from '@/components/ContactItem.vue'
import AgentAvatar from '@/components/AgentAvatar.vue'
import StatusCard from '@/components/StatusCard.vue'

// Form Components
import AppointmentForm from '@/components/AppointmentForm.vue'
import BaseButton from '@/components/BaseButton.vue'
import Drawer from '@/components/Drawer.vue'

// Table Columns
const tableColumns = [
  {
    label: 'Contact',
    classStyle: 'w-[25%]',
  },
  {
    label: 'Address',
    classStyle: 'w-[35%] min-w-72',
  },
  {
    label: 'Status',
    classStyle: 'w-[20%] min-w-64',
  },
  {
    label: 'Agents',
    classStyle: 'w-[20%]',
  },
]

// Table data fetched from AirtableService
const appointments = ref<Appointment[]>([])
const agents = ref<Agent[]>([])
const contacts = ref<Contact[]>([])

// Data displayed, filtered and paginated
const tableData = ref<Appointment[] | []>([])

// Pagination sets after initialization
let pagination = ref()
const { filters, filterAppointments } = useAppointmentsFilter()

/**
 * Initializes the application's data and sets up the necessary pagination and filters.
 *
 * @object AirtableService - Contains functions to fetch, update and edit data
 * @composable useAppointmentsFilter - Used to filter and manage appointments.
 * @composable usePagination - Used to manage pagination and viewed table data.
 *
 */
const loaded = ref(false)
onMounted(async() => {
  Promise.all([
    AirtableService.getAll('Appointments'),
    AirtableService.getAll('Agents'),
    AirtableService.getAll('Contacts'),
  ]).then((data) => {
    appointments.value = data[0]
    agents.value = data[1]
    contacts.value = data[2]
  }).then(() => {
    const { updateShowingRange } = usePagination(appointments.value)
    pagination.value = usePagination(appointments.value)
    tableData.value = updateShowingRange() as Appointment[]
  }).finally(() => {
    loaded.value = true
  })
})

/**
 * When the `filters` object changes, it updates the showing range of the table data.
 * @description Watches the `filters` object for changes.
 */
watch(filters, () => {
  const { updateShowingRange } = usePagination(filterAppointments(appointments.value))
  tableData.value = updateShowingRange()
})

/**
 * Form reactive object for handling form actions.
 * @property open - Whether the form drawer is open or not.
 * @property action - The current action being performed on the form ('create' or 'edit').
 * @property data - The current appointment data being edited.
 */
const form = reactive({
  open: false,
  action: 'create',
  data: {},
})

/**
 * Handles form actions and responses.
 * @param action - The current action being performed on the form ('create' or 'edit').
 * @param data - If editing, the selected appointment data is assigned. Otherwise, an empty object is assigned.
 */
function handleForm(action: string, data: Appointment | null) {
  if ('clear' === action) {
    form.data = {}
    form.open = false
  } else {
    form.data = 'create' === action ? {} : data
    form.open = true
  }
  form.action = action
}

/**
 * Handles form responses and updates the table data accordingly.
 * @param action - The current action being performed on the form ('create' or 'edit').
 * @param msg - The toast message to display
 * @param appointment - The updated appointment data. (Or newly created)
 */
function handleFormResponse(action: string, msg: string, appointment: Appointment) {
  // If creating a new appointment, add it to the beginning of the table data array.
  if ('create' === action) {
    tableData.value.unshift(appointment)
  }
  // If editing an existing appointment, update the corresponding item in the table data array.
  if ('edit' === action) {
    tableData.value = tableData.value.map((apm) => {
      return appointment.field_id === apm.field_id ? appointment : apm
    })
  }
  toast.success(msg, {
    position: 'top-left',
    duration: 3000,
  })
  handleForm('clear')
}
</script>
<template>
  <AppLayout v-model="loaded">
    <div>
      <AppointmentFilters :agents="agents"
                          :appointments="appointments"
                          v-model="filters"
                          class="pb-5"/>
      <div class="my-4 flex">
        <div class="grow">
          <p class="text-xl font-semibold leading-4">{{ appointments.length }}</p>
          <p class="text-base text-grey-500">Appointments found in database</p>
        </div>
        <div>
          <BaseButton class="px-6 py-2 lg:py-3" @click="handleForm('create', null)">
            <IconCirclePlus class="size-6 lg:hidden"/>
            <span class="hidden lg:inline-flex lg:text-sm">Create Appointment</span>
          </BaseButton>
        </div>
      </div>
      <TableView :cols="tableColumns">
        <TableRow v-for="appointment in tableData"
                  :key="appointment.id"
                  @click="handleForm('edit', appointment)"
        >
          <TableColumn class="w-1/4">
            <ContactItem :person="contacts.find(c => c.field_id === appointment.contact[0])"/>
          </TableColumn>
          <TableColumn class="w-1/4">
            <div class="text-grey-700">
              <p class="break-all text-sm">{{ appointment.address }}</p>
            </div>
          </TableColumn>
          <TableColumn class="w-1/4">
            <StatusCard :date="appointment.appointment_date" :status="appointment.status"/>
          </TableColumn>
          <TableColumn class="w-1/4">
            <div class="flex space-x-[-16px]" v-if="appointment.agents">
              <AgentAvatar v-for="agent in appointment.agents"
                           :key="agent"
                           :agent="agents.find(a => a.field_id === agent)"
                           size="40px"/>
            </div>
          </TableColumn>
        </TableRow>
        <template #footer>
          <Pagination v-model="pagination"
                      @update="tableData = pagination.updateShowingRange()"
          />
        </template>
      </TableView>
      <Drawer v-model="form.open" :title="form.action === 'create' ? 'Create Appointment' : 'Edit Appointment'">
        <AppointmentForm :data="form.data"
                         :action="form.action"
                         :contacts="contacts"
                         :agents="agents"
                         @update="handleFormResponse"
        />
      </Drawer>
    </div>
  </AppLayout>
</template>
