<script setup lang="ts">
import { ref } from 'vue'
import { useElementHover } from '@vueuse/core'
const avatarRef = ref<HTMLElement>()
const isHovered = useElementHover(avatarRef)

defineProps({
  size: {
    type: Number,
    default: 56,
  },
  name: {
    type: String,
    default: '',
  },
  background: {
    type: String,
    default: '#e4e4e7',
  },
  label: {
    type: String,
    default: '',
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
        backgroundColor: background,
        width: size + 'px',
        height: size + 'px',
      }"
    >
      <p class="font-semibold text-sm leading-none" :class="label ? 'text-grey-500' : 'text-white'">
        <template v-if="label">{{ label }}</template>
        <slot v-else />
      </p>
    </div>
    <div v-if="isHovered && name" class="absolute bg-black/50 backdrop-blur-xl rounded-lg shadow-xl">
      <p class="text-white text-sm leading-none px-4 py-2.5">
        {{ name }}
      </p>
    </div>
  </div>
</template>
