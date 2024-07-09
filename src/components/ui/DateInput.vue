<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: 'Label',
  },
})
</script>

<template>
  <div class="input-wrapper flex flex-col justify-center w-full">
    <div class="px-4">
      <p class="text-xs leading-none text-grey-500">{{ label }}</p>
      <input type="datetime-local" class="w-full">
    </div>
  </div>
</template>
