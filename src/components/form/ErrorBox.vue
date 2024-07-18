<script setup lang="ts">
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
<div class="mt-1 rounded-md border border-red-500/10 bg-red-700/15 px-3 py-2">
  <p class="text-sm text-red-900">{{ msg }}</p>
</div>
</template>
