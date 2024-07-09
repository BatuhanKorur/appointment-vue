<script setup lang="ts">
import { onMounted, ref, reactive, watch } from 'vue'
import { IconCirclePlus, IconCalendarPlus, IconEdit } from '@tabler/icons-vue'
import { Statuses, Tables, type Appointment, type Agent } from '@/types'
import { Airtable } from '@/server/api'
import { AppButton, Drawer, SelectInput, AvatarGroup, DateInput } from '@/components/ui'
import LoadingPanel from '@/components/LoadingPanel.vue'
import AgentSelect from '@/components/AgentSelect.vue'
import AppointmentCard from '@/components/AppointmentCard.vue'

const appointments = ref<Appointment[]>([])
const agents = ref<Agent[]>([])

const loaded = ref(false)
const statusOptions = ref(['All Statuses', Statuses.UPCOMING, Statuses.COMPLETED, Statuses.CANCELLED])
const filteredAppointments = ref<Appointment[]>([])

onMounted(async() => {
  try {
    appointments.value = await Airtable.getAll(Tables.APPOINTMENTS)
    agents.value = await Airtable.getAll(Tables.AGENTS)
    filteredAppointments.value = appointments.value
  } catch (error) {
    console.error('Failed to load appointments:', error)
  } finally {
    loaded.value = true
  }
})

const filters = reactive({
  status: 'All Statuses',
  from_date: '',
  to_date: '',
  search: '',
})

watch(filters, (changed) => {
  console.log(filters.search)

  filteredAppointments.value = appointments.value.filter((appointment) => {
    if ('All Statuses' === changed.status) {
      return true
    }
    return appointment.status === changed.status.replace('All Statuses', '') as Statuses
  })
})

import CreateAppointmentForm from '@/components/CreateAppointmentForm.vue'
import EditAppointmentForm from '@/components/EditAppointmentForm.vue'
import TextInput from '@/components/ui/TextInput.vue'

const createAppointmentDrawer = ref(false)
const editAppointmentDrawer = ref(false)

const editAppointment = ref()

function onAppointmentClick(appointment: Appointment) {
  editAppointment.value = appointment
}

</script>

<template>
  <div>
    <LoadingPanel v-if="!loaded" />
    <div v-else>
      <div class="border-b pb-5 grid gap-1.5 grid-cols-12 grid-rows-2 lg:grid-rows-1">
        <AgentSelect :agents="agents" class="col-span-12 md:col-span-6 md:row-start-1 lg:col-span-3" />
        <SelectInput
          v-model="filters.status"
          class="col-span-12 md:col-span-4 lg:col-span-2"
          :options="statusOptions"
        />
        <DateInput v-model="filters.from_date" class="col-span-6 md:col-span-4 lg:col-span-2" />
        <DateInput v-model="filters.to_date" class="col-span-6 md:col-span-4 lg:col-span-2" />
        <TextInput
          v-model="filters.search"
          class="col-span-12 md:col-span-6 md:row-start-1 lg:row-auto lg:col-span-3"
        />
      </div>
      <div class="flex flex-col-reverse mt-4 md:flex-row md:justify-between md:mt-8 md:mb-4">
        <p class="mt-6 mb-2 space-x-1 md:flex md:flex-col md:mt-0 md:mb-0">
          <span class="text-base font-semibold text-grey-950 md:text-2xl">{{ appointments.length }}</span>
          <span class="text-base text-grey-500">Appointments Found</span>
        </p>
        <AppButton label="Create Appointment" :icon="IconCirclePlus" @click="createAppointmentDrawer = true" />
      </div>
      <div class="space-y-4">
        <AppointmentCard
          v-for="appointment in filteredAppointments"
          :key="appointment.id"
          :appointment="appointment"
          @click="onAppointmentClick"
        />
      </div>
    </div>
    <Drawer
      v-model="createAppointmentDrawer"
      title="Create Appointment"
      :icon="IconCalendarPlus"
    >
      <CreateAppointmentForm @cancel="createAppointmentDrawer = false" />
    </Drawer>
    <Drawer
      v-model="editAppointmentDrawer"
      title="Edit Appointment"
      :icon="IconEdit"
    >
      <EditAppointmentForm />
    </Drawer>
  </div>
</template>
