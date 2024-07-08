<script setup lang="ts">
import { ref } from 'vue'
import { IconSearch } from '@tabler/icons-vue'
import type { Contact } from '@/types'
import ContactItem from '@/components/ContactItem.vue'

const props = defineProps<{
  options: Contact[]
}>()

const input = ref('')
const filtered = ref([])
const selectBox = ref(false)

function onInput(e: Event) {
  input.value = (e.target as HTMLInputElement).value

  filtered.value = props.options.filter((contact) => {
    const name = `${contact.first_name.toLowerCase()} ${contact.last_name.toLowerCase()}`
    return name.includes(input.value.toLowerCase())
  })
  console.log(input.value)
}

function onContactSelect(contact: Contact) {
  // Handle contact selection
  console.log(`Selected contact: ${contact.first_name} ${contact.last_name}`)
}
</script>

<template>
  <div>
    <div class="flex">
      <input
        type="text"
        placeholder="Search..."
        class="grow h-12 border border-grey-200 rounded-l-lg pl-4 pr-2"
        :value="input"
        @focusin="selectBox = true"
        @input="onInput"
      >
      <div class="bg-black w-12 f-center rounded-r-lg">
        <IconSearch size="20" class="text-white" />
      </div>
    </div>
    <div class="relative">
      <div
        class="absolute w-full max-h-44 bg-white overflow-y-auto mt-1 border border-grey-200 rounded-md shadow-md divide-y"
      >
        <div v-if="filtered.length === 0" class="f-center py-6">
          <p class="italic text-grey-500">No contact found</p>
        </div>
        <template v-else>
          <div
            v-for="option in filtered"
            :key="option.id"
            class="t-200 cursor-pointer hover:bg-grey-100"
            @click="onContactSelect(option)"
          >
            <ContactItem :contact="option" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
