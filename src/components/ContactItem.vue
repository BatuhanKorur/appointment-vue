<script setup lang="ts">
import type { Contact } from '@/types'
import { IconMail, IconPhone } from '@tabler/icons-vue'
defineProps<{
  contact: Contact
}>()
</script>

<template>
  <div class="px-4 py-3 space-y-0.5">
    <div class="space-x-1 text-grey-900 font-medium">
      <span>{{ contact.first_name }}</span>
      <span>{{ contact.last_name }}</span>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center text-grey-700 space-x-1">
        <IconMail size="18" stroke="1.5" />
        <span class="text-sm leading-none">
          {{ contact.email }}
        </span>
      </div>
      <div class="flex items-center text-grey-700 space-x-1">
        <IconPhone size="18" stroke="1.5" />
        <span class="text-sm leading-none">
          {{ contact.phone }}
        </span>
      </div>
    </div>
  </div>
</template>
