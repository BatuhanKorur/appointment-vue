<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Appointment, Contact, Agent } from '@/types'
import { Airtable } from '@/server/api'
import { Avatar } from '@/components/ui'
import ContactItem from '@/components/ContactItem.vue'
import AppointmentStatus from '@/components/AppointmentStatus.vue'
import AddressCard from '@/components/AddressCard.vue'

const props = defineProps<{ appointment: Appointment }>()
const emits = defineEmits(['click'])
const contact = ref<Contact>()
const agents = ref<Agent[]>([])

onMounted(async() => {
  // There is only one contact associated with the appointment
  contact.value = await Airtable.getContact(props.appointment.contact[0])

  // There may be multiple agents associated with the appointment
  const a = props.appointment.agents
  if (a && 0 < a.length) {
    agents.value = await Promise.all(a.map(async(agentId) => await Airtable.getAgent(agentId)))
  }
})

function onClick() {
  emits('click', props.appointment)
}
</script>
<template>
  <div class="border rounded t-300 hover:border-blue-200 p-4 card-grid" @click="onClick">
    <ContactItem v-if="contact" :contact="contact" class="contact" />
    <AddressCard class="address">
      {{ appointment.address }}
    </AddressCard>
    <AppointmentStatus
      :date="appointment.appointment_date"
      :status="appointment.status"
      class="status"
    />
    <div class="inline-flex space-x-[-16px] agents">
      <Avatar
        v-for="agent in agents"
        :key="agent.id"
        :agent="agent"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.card-grid {
	@apply grid grid-cols-10 grid-rows-subgrid gap-y-2;
	@apply md:gap-x-3;
	@apply lg:grid-cols-11;

	.contact {
		@apply col-span-10;
		@apply md:col-span-5 md:row-start-1;
		@apply lg:col-span-3;
	}

	.address {
    @apply col-span-10;
		@apply md:col-span-5 md:row-start-2;
		@apply lg:col-span-3 lg:row-start-1;
  }

	.status {
    @apply col-span-10;
		@apply md:col-span-5 md:row-start-2;
		@apply lg:col-span-3 lg:row-start-1;
  }

	.agents {
    @apply col-span-10;
		@apply md:col-span-5 md:row-start-1;
		@apply lg:col-span-2;
  }
}
</style>
