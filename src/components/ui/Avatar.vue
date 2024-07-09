<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  size: {
    type: Number,
    default: 56,
  },
  background: {
    type: String,
    default: '#e4e4e7',
  },
  label: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div>
    <div
      class="rounded-full f-center border-4 border-white"
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
  </div>
</template>
