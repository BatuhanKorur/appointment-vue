<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue'
import { IconCirclePlus, IconCalendarPlus, IconEdit } from '@tabler/icons-vue'
import { Statuses, Tables, type Appointment, type Agent } from '@/types'
import { Airtable } from '@/server/api'
import { AppButton, Drawer, SelectInput, DateInput, TextInput } from '@/components/ui'
import LoadingPanel from '@/components/LoadingPanel.vue'
import AgentFilter from '@/components/AgentFilter.vue'
import AppointmentCard from '@/components/AppointmentCard.vue'
import CreateAppointmentForm from '@/components/CreateAppointmentForm.vue'
import EditAppointmentForm from '@/components/EditAppointmentForm.vue'

const appointments = ref<Appointment[]>([])
const agents = ref<Agent[]>([])
const filtered = ref<Appointment[]>([])

const loaded = ref(false)
const createAppointmentDrawer = ref(false)
const editAppointmentDrawer = ref(false)
const statusOptions = ref(['All', Statuses.UPCOMING, Statuses.COMPLETED, Statuses.CANCELLED])

onMounted(async() => {
  try {
    appointments.value = await Airtable.getAll(Tables.APPOINTMENTS)
    agents.value = await Airtable.getAll(Tables.AGENTS)
    filtered.value = appointments.value
  } catch (error) {
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

watch(filters, (changed) => {
  let f = []
  if (0 < filters.agents.length) {
    appointments.value.forEach((appointment) => {
      if (appointment.agents.some((agentId) => filters.agents.includes(agentId))) {
        f.push(appointment)
      }
    })
  } else {
    f.push(...appointments.value)
  }

  if ('All' !== filters.status) {
    f = f.filter((appointment) => appointment.status === filters.status)
  }

  filtered.value = f
}, { deep: true })
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
        <p>{{ filters.status }}</p>
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
      <div class="flex flex-col-reverse mt-4 md:flex-row md:justify-between md:mt-8 md:mb-4">
        <p class="mt-6 mb-2 space-x-1 md:flex md:flex-col md:mt-0 md:mb-0">
          <span class="text-base font-semibold text-grey-950 md:text-2xl">{{ appointments.length }}</span>
          <span class="text-base text-grey-500">Appointments Found</span>
        </p>
        <AppButton label="Create Appointment" :icon="IconCirclePlus" @click="createAppointmentDrawer = true" />
      </div>
      <div class="space-y-4">
        <AppointmentCard
          v-for="appointment in filtered"
          :key="appointment.id"
          :appointment="appointment"
          @click="() => {}"
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
