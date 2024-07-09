<script setup lang="ts">
import { onMounted, ref, reactive, type PropType } from 'vue'
import { Airtable } from '@/server/api'
import { type Contact, type Agent, type Appointment, Tables } from '@/types'
import { IconX } from '@tabler/icons-vue'
import { TextInput, DateInput, AppButton, ListSelect, IconButton } from '@/components/ui'
import ContactItem from '@/components/ContactItem.vue'
import AgentItem from '@/components/AgentItem.vue'
import ErrorBox from '@/components/ErrorBox.vue'

// We initialize form state
const props = defineProps({
  formData: {
    type: Object as PropType<Appointment>,
    required: true,
  },
})
const form = reactive({
  ...props.formData,
})

// Display selected agents and contacts in a list
const selectedAgents = ref<Agent[]>()
const selectedContact = ref<Contact>()

// We first fetch all contacts and agents from Airtable
const contacts = ref<Contact[]>([])
const agents = ref<Agent[]>([])
onMounted(async() => {
  contacts.value = await Airtable.getAll(Tables.CONTACTS)
  agents.value = await Airtable.getAll(Tables.AGENTS)

  // If contact is already selected, set it in the form
  if (form.contact) {
    selectedContact.value = contacts.value.find((c) => c.field_id === form.contact[0])
  }

  if (form.agents) {
    selectedAgents.value = form.agents.map((id) => agents.value.find((a) => a.field_id === id))
  }
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
}

const validations = ref<string[]>([])
function validateForm() {
  validations.value = []
  if (0 === form.contact.length) {
    validations.value.push('Please select a contact')
  }
  if (0 === form.agents.length) {
    validations.value.push('Please select at least one agent')
  }
  if ('' === form.appointment_date) {
    validations.value.push('Please select an appointment date')
  }
  if ('' === form.address) {
    validations.value.push('Please enter an address')
  }

  return 0 === validations.value.length
}

async function create() {
  if (!validateForm()) {
    return
  } else {
    console.log(form)
    const create = await Airtable.createAppointment(form)
    console.log(create)
  }
}

const emits = defineEmits(['cancel'])
</script>

<template>
  <div class="mb-8">
    <div class="mb-5 space-y-2">
      <ListSelect
        label="Contact"
        :options="contacts"
        select-from="contacts"
        @select="onContactSelect"
      />
      <div v-if="selectedContact" class="flex bg-grey-100 border rounded-md p-3">
        <ContactItem :contact="selectedContact" class="grow" />
        <IconButton :icon="IconX" @click="onContactRemove" />
      </div>
    </div>
    <div class="mb-5">
      <TextInput v-model="form.address" label="Address" />
    </div>
    <div class="mb-5 space-y-2">
      <ListSelect
        label="Agents"
        :options="contacts"
        select-from="agents"
        @select="onAgentSelect"
      />
      <template v-if="selectedAgents">
        <div v-for="agent in selectedAgents" :key="agent.id" class="flex bg-grey-100 border rounded-md p-3">
          <AgentItem :agent="agent" class="grow" />
          <IconButton :icon="IconX" @click="onAgentRemove" />
        </div>
      </template>
    </div>
    <DateInput v-model="form.appointment_date" label="Date" />
  </div>
  <div class="flex justify-end space-x-2">
    <AppButton label="Cancel" color="grey" @click="cancel" />
    <AppButton label="Submit" color="blue" @click="create" />
  </div>
  <div class="space-y-2 mt-8">
    <ErrorBox v-for="(error, index) in validations" :key="index">
      {{ error }}
    </ErrorBox>
  </div>
</template>
