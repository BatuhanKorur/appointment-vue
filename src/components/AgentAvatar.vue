<script setup lang="ts">
import { useElementHover } from '@vueuse/core'
import { ref, type PropType } from 'vue'
import { type Agent } from '@/types'

defineProps({
  agent: {
    type: Object as PropType<Agent>,
  },
  label: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '48px',
  },
  clickable: {
    type: Boolean,
    default: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})

const avatar = ref<HTMLElement>()
const hover = useElementHover(avatar)
</script>

<template>
  <div class="relative">
    <div ref="avatar"
         :class="['rounded-full p-[3px]', { 'clickable': clickable, 'selected': selected}]"
         :style="{ width: size, height: size }"
    >
      <div v-if="agent"
           class="avatar text-white"
           :style="{ backgroundColor: agent.color }"
      >
        <span>{{ agent.first_name.charAt(0) }}</span>
        <span>{{ agent.last_name.charAt(0) }}</span>
      </div>
      <div v-else class="avatar bg-grey-200 text-grey-700">
        <span>{{ label }}</span>
      </div>
    </div>
    <div v-if="clickable && hover && agent" class="absolute right-0 rounded-lg bg-black/50 shadow-lg backdrop-blur">
      <div class="px-2 py-1">
        <p class="text-nowrap text-sm text-white">
          {{ agent.first_name }} {{ agent.last_name }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.avatar {
  @apply flex items-center justify-center size-full rounded-full;
  span {
    @apply leading-none text-xs font-semibold;
  }
}

.clickable {
  @apply cursor-pointer transition duration-200 ease-in-out;

  &.selected {
    @apply bg-blue-600 hover:bg-blue-300;
  }

  &:not(.selected) {
    @apply bg-white hover:bg-blue-500;
  }
}

</style>
