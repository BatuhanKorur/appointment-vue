<script setup lang="ts">
import { ref, type PropType } from 'vue'
import type { Agent } from '@/types'
import { useElementHover } from '@vueuse/core'
import { initials, fullName } from '@/utils'
const avatarRef = ref<HTMLElement>()
const isHovered = useElementHover(avatarRef)

defineProps({
  size: {
    type: Number,
    default: 56,
  },
  agent: {
    type: Object as PropType<Agent>,
    default: null,
  },
  active: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div ref="avatarRef" class="relative">
    <div
      class="rounded-full f-center border-4 cursor-pointer"
      :class="active ? 'border-blue-600' : 'border-white'"
      :style="{
        backgroundColor: agent?.color ?? '#E9E9E9',
        width: size + 'px',
        height: size + 'px',
      }"
    >
      <p class="font-semibold text-sm leading-none">
        <span v-if="agent" class="text-white">
          {{ initials(agent) }}
        </span>
        <span v-else class="Text-grey-600">
          <slot />
        </span>
      </p>
    </div>
    <div v-if="isHovered && agent" class="absolute bg-black/50 backdrop-blue-xl rounded-lg shadow-lg">
      <div class="px-2 py-1">
        <p class="text-sm text-white text-nowrap">
          {{ fullName(agent) }}
        </p>
      </div>
    </div>
  </div>
</template>
