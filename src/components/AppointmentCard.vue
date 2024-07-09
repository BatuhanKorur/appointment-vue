<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Appointment, Contact, Agent } from '@/types'
import { Airtable } from '@/server/api'
import ContactItem from '@/components/ContactItem.vue'
import AppointmentStatus from '@/components/AppointmentStatus.vue'
const props = defineProps<{ appointment: Appointment }>()
import { IconMapPin } from '@tabler/icons-vue'
import AvatarGroup from '@/components/ui/AvatarGroup.vue'

const contact = ref<Contact>()
const agents = ref<Agent[]>([])
onMounted(async() => {
  // There is only one contact associated with the appointment
  contact.value = await Airtable.getContact(props.appointment.contact[0])

  // There may be multiple agents associated with the appointment
  if (props.appointment.agents) {
    for (const agentId of props.appointment.agents) {
      const agent = await Airtable.getAgent(agentId)
      agents.value.push(agent)
    }
  }
})
</script>
<template>
  <div class="border p-4 rounded-md shadow-sm space-y-2 grid grid-cols-4">
    <ContactItem v-if="contact" :contact="contact" />
    <div class="flex bg-grey-50 border border-grey-100 rounded-md p-4 space-x-1">
      <IconMapPin size="20" class="text-grey-800" />
      <p class="text-sm text-grey-800">{{ appointment.address }}</p>
    </div>
    <AppointmentStatus :date="appointment.appointment_date" :status="appointment.status" />
    <AvatarGroup :avatars="agents" />
  </div>
</template>
