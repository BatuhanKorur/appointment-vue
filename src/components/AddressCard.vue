<script setup lang="ts">
import { IconMapPin } from '@tabler/icons-vue'
</script>

<template>
  <div class="flex items-center space-x-2 bg-grey-100/75 p-4 rounded-md">
    <IconMapPin size="20" class="text-grey-500" />
    <p class="text-base text-grey-900 leading-none"><slot /></p>
  </div>
</template>
