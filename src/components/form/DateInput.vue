<script setup lang="ts">
import { IconCalendarMonth } from '@tabler/icons-vue'

const model = defineModel({
  type: String,
  required: true,
})

defineProps({
  dateOnly: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="input-wrapper w-full">
    <div class="icon">
      <IconCalendarMonth class="size-5"/>
    </div>
    <input
      v-model="model"
      v-bind="$attrs"
      class="text-base"
      :type="dateOnly ? 'date' : 'datetime-local'"
    >
  </div>
</template>

<style scoped lang="postcss">
input[type="date"],
input[type="datetime-local"] {
  @apply relative;

  &::-webkit-calendar-picker-indicator {
    @apply absolute top-0 right-0 size-full p-0 cursor-pointer;
    color: transparent;
    background: transparent;
  }
}
</style>
