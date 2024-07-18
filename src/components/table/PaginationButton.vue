<script setup lang="ts">
import { computed } from 'vue'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue'
const props = defineProps({
  label: {
    type: [String, Number],
    default: '',
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const btnStyle = computed(() => {
  return props.active ? 'bg-blue-500 text-white' : 'bg-white transition duration-200 ease-in-out hover:bg-blue-100'
})
</script>

<template>
  <div class="f-center cursor-pointer px-4" :class="btnStyle">
    <IconChevronLeft v-if="label === 'left'" class="size-4"/>
    <IconChevronRight v-else-if="label === 'right'" class="size-4"/>
    <p v-else class="text-sm font-medium leading-none">{{ label }}</p>
  </div>
</template>
