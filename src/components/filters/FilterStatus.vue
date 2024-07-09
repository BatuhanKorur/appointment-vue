<script setup lang="ts">
import SelectInput from '@/components/ui/SelectInput.vue'
const options = [
  'All',
  'Cancelled',
  'Upcoming',
  'Completed',
]
</script>

<template>
  <div>
    <SelectInput :options="options" class="h-full flex items-center" />
  </div>
</template>
