<script setup lang="ts">
import { type PropType, ref, watch } from 'vue'
import type { Contact, Agent } from '@/types'
import { IconSquareXFilled } from '@tabler/icons-vue'

import SelectPopover from '@/components/form/SelectPopover.vue'
import ContactItem from '@/components/ContactItem.vue'
import AgentItem from '@/components/AgentItem.vue'

type Person = Contact[] | Agent[]

const model = defineModel({
  type: Array as PropType<Person>,
  default: () => [],
})

const props = defineProps({
  data: {
    type: Array as PropType<Person>,
  },
  personType: {
    type: String as PropType<'agent' | 'contact'>,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
})

const query = ref('')
const popover = ref(false)
const filteredData = ref(props.data)

function onSelect(person: Contact | Agent) {
  if (props.multiple) {
    model.value.push(person)
  } else {
    model.value[0] = person
  }
  onClear()
}

function onRemove(index: number) {
  model.value.splice(index, 1)
}

function onClear() {
  query.value = ''
  popover.value = false
}

watch(query, () => {
  if (props.data) {
    filteredData.value = props.data.filter((person) =>
      person.first_name.toLowerCase().includes(query.value.toLowerCase())
      || person.last_name.toLowerCase().includes(query.value.toLowerCase()),
    )
  }
})
</script>

<template>
  <div>
    <div class="rounded-md border border-grey-200 px-4 py-3">
      <div v-for="(item, i) in model" :key="i" class="relative">
        <component :is="personType === 'agent'? AgentItem : ContactItem" :person="item"/>
        <div class="absolute right-1 top-1 cursor-pointer" @click="onRemove">
          <IconSquareXFilled class="size-6 text-grey-400"/>
        </div>
      </div>
      <template v-if="model.length === 0 || multiple">
        <input
          type="text"
          v-model="query"
          :placeholder="model.length === 0 ? `Search for a ${personType}` : `Add another`"
          class="w-full text-base focus:outline-none"
          @blur="query = ''"
          :class="model.length ? 'mt-3' : 'mt-0'"
          @click="popover = true"/>
      </template>
    </div>
    <SelectPopover v-model="popover" class="w-full">
      <template v-if="filteredData.length">
        <component :is="personType === 'agent'? AgentItem : ContactItem"
                   v-for="(person, index) in filteredData"
                   :key="index"
                   :person="person"
                   class="t-200 cursor-pointer hover:bg-grey-100"
                   :class="personType === 'contact' ? 'p-3' : 'px-3 py-2.5'"
                   @click="onSelect(person)"
        />
      </template>
      <template v-else>
        <div class="p-8 text-sm italic text-grey-400">
          No results found
        </div>
      </template>
    </SelectPopover>
  </div>
</template>
