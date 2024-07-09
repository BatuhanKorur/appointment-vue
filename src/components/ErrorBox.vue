<script setup lang="ts">
import { IconExclamationCircle } from '@tabler/icons-vue'
</script>

<template>
  <div class="border border-red-500/25 bg-red-50 p-4 rounded-md">
    <div class="flex">
      <div class="w-8 flex items-center">
        <IconExclamationCircle class="text-red-900" size="20" />
      </div>
      <p class="grow text-red-900 font-[425]"><slot /></p>
    </div>
  </div>
</template>
