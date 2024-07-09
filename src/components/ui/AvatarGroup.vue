<script setup lang="ts">
import { computed } from 'vue'
import { initials, fullName } from '@/utils'
import type { Agent } from '@/types'
import { Avatar } from '@/components/ui'

const props = defineProps<{ avatars: Agent[] }>()
const previews = computed(() => props.avatars.slice(0, 4))
const emit = defineEmits(['selectAgent', 'loadMore'])
</script>

<template>
  <div>
    <div class="inline-flex space-x-[-16px]">
      <Avatar
        v-for="agent in previews"
        :key="agent.id"
        :name="fullName(agent.first_name, agent.last_name)"
        :background="agent.color"
        @click="emit('selectAgent', agent)"
      >
        {{ initials(agent.first_name, agent.last_name) }}
      </Avatar>
      <Avatar
        v-if="previews.length < props.avatars.length"
        :label="`+${props.avatars.length - previews.length }`"
        @click="emit('loadMore')"
      />
    </div>
  </div>
</template>
