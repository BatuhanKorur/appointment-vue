<script setup lang="ts">
import { ref, PropType } from 'vue'
import type { Contact, Agent } from '@/types'
import { onClickOutside } from '@vueuse/core'
import { ListBox, TextInput } from '@/components/ui'
import ContactItem from '@/components/ContactItem.vue'
import AgentItem from '@/components/AgentItem.vue'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  selectFrom: {
    type: String as PropType<'contacts' | 'agents'>,
    default: '',
  },
})

const input = ref('')
const filtered = ref<Contact[] | Agent[]>([])
const listbox = ref(false)
const listboxRef = ref()

function onInput(e: Event) {
  input.value = (e.target as HTMLInputElement).value
  filtered.value = props.options.filter((item) => {
    const name = `${item.first_name.toLowerCase()} ${item.last_name.toLowerCase()}`
    return name.includes(input.value.toLowerCase())
  })
}

const emits = defineEmits(['select'])
function onSelect(contact: Contact) {
  listbox.value = false
  emits('select', contact)
}

onClickOutside(listboxRef, () => listbox.value = false)
</script>

<template>
  <div>
    <TextInput
      :value="input"
      :label="label"
      @input="onInput"
      @click="listbox = true"
    />
    <ListBox ref="listboxRef" v-model="listbox">
      <template v-if="selectFrom === 'contacts'">
        <ContactItem
          v-for="option in filtered"
          :key="option.id"
          :contact="option"
          class="p-4"
          @click="onSelect(option)"
        />
      </template>
      <template v-if="selectFrom === 'agents'">
        <AgentItem
          v-for="option in filtered"
          :key="option.id"
          :agent="option"
          class="p-4"
          @click="onSelect(option)"
        />
      </template>
    </ListBox>
  </div>
</template>
