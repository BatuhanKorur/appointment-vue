<script setup lang="ts">
defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>

<template>
  <div class="border border-grey-200 rounded-md h-[52px]">
    <select class="w-full h-full mx-4">
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>
