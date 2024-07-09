<script setup lang="ts">
import { ref, type PropType } from 'vue'
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
    type: Array as PropType<Contact[] | Agent[]>,
    default: () => [],
  },
  selectFrom: {
    type: String as PropType<'contacts' | 'agents'>,
    default: '',
  },
})

const input = ref('')
const filtered = ref<Contact[] | Agent[]>([])
const showBox = ref(false)

// Filters options based on input value and emits selected option when clicked on a list item
function onInput(e: Event) {
  showBox.value = true
  input.value = (e.target as HTMLInputElement).value
  // Transforms all options to lowercase for case-insensitive search
  filtered.value = props.options.filter((item) => {
    const name = `${item.first_name.toLowerCase()} ${item.last_name.toLowerCase()}`
    return name.includes(input.value.toLowerCase())
  }) as (Contact & Agent)[]
}

// Emits selected contact or agent when clicked on a list item
const emits = defineEmits(['select'])
function onSelect(option: Contact | Agent) {
  showBox.value = false
  emits('select', option)
}

// Closes model when clicked outside
const listboxRef = ref()
onClickOutside(listboxRef, () => showBox.value = false)
</script>

<template>
  <div>
    <TextInput
      :value="input"
      :label="label"
      @input="onInput"
    />
    <ListBox ref="listboxRef" v-model="showBox" :empty="filtered.length === 0">
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
