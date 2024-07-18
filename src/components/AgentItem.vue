<script setup lang="ts">
import { type PropType } from 'vue'
import { type Agent } from '@/types'
import AgentAvatar from '@/components/AgentAvatar.vue'

defineProps({
  person: {
    type: Object as PropType<Agent>,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
<div class="t-200 flex cursor-pointer items-center space-x-1 rounded-lg p-1"
     :class="selected ? 'bg-blue-200 hover:bg-blue-100' : 'bg-white hover:bg-grey-100'">
  <AgentAvatar :agent="person" size="32px" :clickable="false"/>
  <p class="space-x-1 text-sm text-grey-800">
    <span>{{ person.first_name }}</span>
    <span>{{ person.last_name }}</span>
  </p>
</div>
</template>
