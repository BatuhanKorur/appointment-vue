<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: Function,
    default: null,
  },
  color: {
    type: String,
    default: 'green',
  },
})

const buttonClass = computed(() => {
  switch (props.color) {
    case 'green':
      return 'bg-emerald-600 text-white'
    case 'blue':
      return 'bg-blue-600 text-white'
    case 'red':
      return 'bg-red-600 text-white'
    case 'grey':
      return 'bg-grey-200 text-grey-600'
    default:
      return 'bg-emerald-600 text-white'
  }
})
</script>

<template>
  <button class="inline-flex px-6 py-3.5 f-center rounded-md t-300 hover:bg-opacity-85" :class="buttonClass">
    <component :is="icon" v-if="icon" class="size-[21px] text-white mr-2" />
    <span class="text-[15px] font-[450] leading-none">
      {{ label }}
    </span>
  </button>
</template>
