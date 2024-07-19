<script setup lang="ts">
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
<div class="mt-1 rounded-md border border-red-700/10 bg-red-100 px-3 py-1.5">
  <p class="text-[13.5px] font-medium text-red-900">{{ msg }}</p>
</div>
</template>
