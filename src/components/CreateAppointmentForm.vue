<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { Airtable } from '@/server/api'
import { type Contact, type Agent, Tables } from '@/types'
import TextInput from '@/components/ui/TextInput.vue'
import SearchSelect from '@/components/ui/SearchSelect.vue'
import SelectInput from '@/components/ui/SelectInput.vue'
import DateInput from '@/components/ui/DateInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

const contacts = ref<Contact[]>([])
const agents = ref<Agent[]>([])
onMounted(async() => {
  contacts.value = await Airtable.getAll(Tables.CONTACTS)
  agents.value = await Airtable.getAll(Tables.AGENTS)
})

const emits = defineEmits(['cancel'])
const form = reactive({
  contact: '',
  agents: [],
  address: '',
  date: '',
})

function cancel() {
  emits('cancel')
  console.log('Cancel clicked')
}

function create() {
  console.log('Hello World')
}
</script>

<template>
  <div class="mb-8 space-y-4">
    <SearchSelect :options="contacts" />
    <TextInput v-model="form.address" label="Address" />
    <SelectInput v-model="form.agents" label="Agent" :options="agents" />
    <DateInput v-model="form.date" label="Date" />
  </div>
  <div class="flex justify-end space-x-2">
    <AppButton label="Cancel" color="grey" @click="cancel" />
    <AppButton label="Submit" color="blue" @click="create" />
  </div>
</template>
