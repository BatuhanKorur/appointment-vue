<script setup lang="ts">
import { type PropType } from 'vue'
import { Status, type Appointment, type Agent } from '@/types'
import AgentSelect from '@/components/form/AgentSelect.vue'
import SelectInput from '@/components/form/SelectInput.vue'
import SearchInput from '@/components/form/SearchInput.vue'
import DateInput from '@/components/form/DateInput.vue'

/**
 * Model object for useAppointmentsFilter composable
 * @description Filter object created via useAppointmentsFilter composable
 */
const model = defineModel({
  type: Object,
})

defineProps({
  agents: {
    type: Array as PropType<Agent[]>,
    required: true,
  },
  appointments: {
    type: Array as PropType<Appointment[]>,
  },
})
</script>

<template>
  <div class="grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-4 lg:grid-cols-12">
    <AgentSelect v-model="model.agents"
                 :agents="agents"
                 class="lg:col-span-2"
    />
    <SelectInput v-model="model.status"
                 :options="['All', Status.Upcoming, Status.Cancelled, Status.Completed]"
                 class="lg:col-span-2"
    />
    <DateInput v-model="model.startDate"
               class="lg:col-span-2"
               date-only
    />
    <DateInput v-model="model.endDate"
               class="lg:col-span-2"
               date-only
    />
    <SearchInput v-model="model.query"
                 class="col-span-2 md:col-span-4"
    />
  </div>
</template>
