<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Airtable } from '@/server/api'
import type { Contact } from '@/types'
import SearchSelect from '@/components/ui/SearchSelect.vue'

const contacts = ref<Contact[]>([])
onMounted(async() => {
  contacts.value = await Airtable.getContacts()
  console.log(contacts.value)
})
</script>

<template>
  <div>
    <SearchSelect :options="contacts" />
    <p>Form Data is Here</p>
  </div>
</template>
