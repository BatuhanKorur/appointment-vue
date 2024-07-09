<script setup lang="ts">
import { ref } from 'vue'
import ListBox from '@/components/ui/ListBox.vue'
import AgentItem from '@/components/AgentItem.vue'
import { fullName } from '@/utils'
import type { Agent } from '@/types'

const selected = defineModel({
  type: Array,
  required: true,
})

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
})

function onSelect(option: Agent) {
}

const input = ref('')
const isActive = ref(false)
</script>

<template>
  <div>
    <label>Agent</label>
    <div class="input-wrapper">
      <div class="inline-flex flex-wrap overflow-x-visible">
        <div v-for="(item, index) in selected" :key="index" class="bg-grey-100 m-1 px-2.5 py-1.5 rounded-md">
          <span class="text-[13px] text-grey-800">
            {{ fullName(item.first_name, item.last_name) }}
          </span>
        </div>
        <input
          v-model="input"
          type="text"
          @focusin="isActive = true"
          @focusout="isActive = false"
        >
      </div>
    </div>
    <ListBox v-model="isActive">
      <div
        v-for="(opt, index) in options"
        :key="index"
        class="list-box-item"
        :class="selected.includes(opt)? 'bg-blue-100' : ''"
        @click="onSelect(opt)"
      >
        <AgentItem :agent="opt" class="p-4" />
      </div>
    </ListBox>
  </div>
</template>

<style scoped lang="postcss">
.list-box-item {
	@apply cursor-pointer transition duration-300 ease-in-out;
	@apply hover:bg-grey-100;
}

.selected {
	@apply bg-blue-200;
}
</style>
