<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { Airtable } from '@/server/api'
import { type Contact, type Agent, Tables } from '@/types'
import { IconX } from '@tabler/icons-vue'
import { TextInput, DateInput, AppButton, ListSelect, IconButton } from '@/components/ui'
import ContactItem from '@/components/ContactItem.vue'
import AgentItem from '@/components/AgentItem.vue'

const contacts = ref<Contact[]>([])
const selectedContact = ref<Contact | null>(null)

const agents = ref<Agent[]>([])
const selectedAgents = ref<Agent[]>([])

onMounted(async() => {
  contacts.value = await Airtable.getAll(Tables.CONTACTS)
  agents.value = await Airtable.getAll(Tables.AGENTS)
})

const emits = defineEmits(['cancel'])

const form = reactive({
  appointment_date: '',
  address: '',
  status: 'Upcoming',
  agents: [],
  contact: [],
})

function onContactSelect(contact: Contact) {
  selectedContact.value = contact
  form.contact = [contact.field_id]
}

function onContactRemove() {
  selectedContact.value = null
  form.contact = []
}

function onAgentSelect(agent: Agent) {
  if (selectedAgents.value?.find((i) => i.id === agent.id)) {
    return
  }
  selectedAgents.value.push(agent)
  form.agents = selectedAgents.value.map((i) => i.field_id)
}

function onAgentRemove(agent: Agent) {
  selectedAgents.value = selectedAgents.value.filter((i) => i.id !== agent.id)
  form.agents = selectedAgents.value.map((i) => i.field_id)
}

function cancel() {
  emits('cancel')
  console.log('Cancel clicked')
}

async function create() {
  const create = await Airtable.createAppointment(form)
}
</script>

<template>
  <div class="mb-8 space-y-4">
    <ListSelect
      label="Contact"
      :options="contacts"
      select-from="contacts"
      @select="onContactSelect"
    />
    <div v-if="selectedContact" class="flex">
      <ContactItem :contact="selectedContact" class="grow" />
      <IconButton :icon="IconX" @click="onContactRemove" />
    </div>
    <TextInput v-model="form.address" label="Address" />
    <ListSelect
      label="Agents"
      :options="contacts"
      select-from="agents"
      @select="onAgentSelect"
    />
    <template v-if="selectedAgents">
      <div v-for="agent in selectedAgents" class="flex">
        <AgentItem :agent="agent" class="grow" />
        <IconButton :icon="IconX" @click="onAgentRemove" />
      </div>
    </template>
    <DateInput v-model="form.appointment_date" label="Date" />
  </div>
  <div class="flex justify-end space-x-2">
    <AppButton label="Cancel" color="grey" @click="cancel" />
    <AppButton label="Submit" color="blue" @click="create" />
  </div>
</template>
