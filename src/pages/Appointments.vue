<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue'
import { IconCalendarPlus, IconEdit } from '@tabler/icons-vue'
import { Statuses, Tables, type Appointment, type Agent } from '@/types'
import { Airtable } from '@/server/api'
import { Drawer, SelectInput, DateInput, TextInput } from '@/components/ui'
import LoadingPanel from '@/components/LoadingPanel.vue'
import AgentFilter from '@/components/AgentFilter.vue'
import AppointmentCard from '@/components/AppointmentCard.vue'
import AppointmentForm from '@/components/AppointmentForm.vue'
import PageHeader from '@/components/PageHeader.vue'
import { toast } from 'vue3-toastify'

const appointments = ref<Appointment[]>([])
const agents = ref<Agent[]>([])
const filtered = ref<Appointment[]>([])

const loaded = ref(false)
const formDrawer = ref(false)
const statusOptions = ref(['All', Statuses.UPCOMING, Statuses.COMPLETED, Statuses.CANCELLED])

onMounted(async() => {
  try {
    appointments.value = await Airtable.getAll(Tables.APPOINTMENTS)
    agents.value = await Airtable.getAll(Tables.AGENTS)
    filtered.value = appointments.value
  } catch (error) {
    toast('Failed to load appointment', {
      theme: 'dark',
      type: 'error',
      position: 'bottom-center',
      transition: 'slide',
    })
    console.error('Failed to load appointments:', error)
  } finally {
    loaded.value = true
  }
})

const filters = reactive({
  agents: [],
  status: 'All',
  from_date: '',
  to_date: '',
  search: '',
})

watch(filters, () => {
  let f = []
  // TODO: Needs improvements, code is dirty
  if (0 < filters.agents.length) {
    appointments.value.forEach((appointment) => {
      if (appointment.agents) {
        appointment.agents.forEach((agentId) => {
          if (filters.agents.includes(agentId)) {
            f.push(appointment)
            return
          }
        })
        return
      }
    })
  } else {
    f.push(...appointments.value)
  }

  if ('All' !== filters.status) {
    f = f.filter((appointment) => appointment.status === filters.status)
  }

  if (filters.from_date) {
    f = f.filter((appointment) => new Date(appointment.appointment_date) >= new Date(filters.from_date))
  }

  if (filters.to_date) {
    f = f.filter((appointment) => new Date(appointment.appointment_date) <= new Date(filters.to_date))
  }

  if (filters.search) {
    f = f.filter((appointment) =>
      appointment.address.toLowerCase().includes(filters.search.toLowerCase())
      || appointment.contact_str[0].toLowerCase().includes(filters.search.toLowerCase()),
    )
  }

  filtered.value = f
}, { deep: true })

const formType = ref('')
const formData = ref<Appointment>()
function openForm(type: 'create' | 'edit', appointment?: Appointment) {
  formType.value = type

  if ('create' === formType.value) {
    formData.value = {
      appointment_date: '',
      address: '',
      status: Statuses.UPCOMING,
      agents: [],
      contact: [],
    }
  } else {
    formData.value = appointment
  }
  formDrawer.value = true
}
</script>

<template>
  <div>
    <LoadingPanel v-if="!loaded" />
    <div v-else>
      <div class="border-b pb-5 grid gap-1.5 grid-cols-12 grid-rows-2 lg:grid-rows-1">
        <AgentFilter
          v-model="filters.agents"
          :agents="agents"
          class="col-span-12 md:col-span-6 md:row-start-1 lg:col-span-3"
        />
        <SelectInput
          v-model="filters.status"
          class="col-span-12 md:col-span-4 lg:col-span-2"
          :options="statusOptions"
        />
        <DateInput v-model="filters.from_date" date-only class="col-span-6 md:col-span-4 lg:col-span-2" />
        <DateInput v-model="filters.to_date" date-only class="col-span-6 md:col-span-4 lg:col-span-2" />
        <TextInput
          v-model="filters.search"
          class="col-span-12 md:col-span-6 md:row-start-1 lg:row-auto lg:col-span-3"
        />
      </div>
      <PageHeader :length="filtered.length" @create-appointment="openForm('create')" />
      <div class="space-y-4">
        <AppointmentCard
          v-for="appointment in filtered"
          :key="appointment.id"
          :appointment="appointment"
          @click="openForm('edit', appointment)"
        />
      </div>
    </div>
    <Drawer
      v-model="formDrawer"
      :title="formType === 'create'? 'Create Appointment' : 'Edit Appointment'"
      :icon="formType === 'create'? IconCalendarPlus : IconEdit"
    >
      <AppointmentForm
        :form-data="formData"
        :form-type="formType"
        @cancel="formDrawer = false"
      />
    </Drawer>
  </div>
</template>
