<script setup lang="ts">
import type { Agent } from '@/types'
import { fullName, initials } from '@/utils'
defineProps<{ agent: Agent }>()
</script>

<template>
  <div class="flex items-center space-x-2.5">
    <div
      class="size-8 rounded-full f-center"
      :style="{
        backgroundColor: agent.color
      }"
    >
      <span class="text-xs font-semibold text-white leading-none">
        {{ initials(agent.first_name, agent.last_name) }}
      </span>
    </div>
    <p>{{ fullName(agent.first_name, agent.last_name) }}</p>
  </div>
</template>
