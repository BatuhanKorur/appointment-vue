<script setup lang="ts">
import type { Contact } from '@/types'
import { IconMail, IconPhone } from '@tabler/icons-vue'
defineProps<{
  contact: Contact
}>()
</script>

<template>
  <div class="space-y-0.5">
    <p class="text-sm text-grey-900 font-medium md:text-base">
      {{ contact.first_name }} {{ contact.last_name }}
    </p>
    <div class="flex flex-col">
      <div class="flex items-center text-grey-700 space-x-1">
        <IconMail size="16" stroke="1.5" />
        <span class="text-sm">
          {{ contact.email }}
        </span>
      </div>
      <div class="flex items-center text-grey-700 space-x-1">
        <IconPhone size="16" stroke="1.5" />
        <span class="text-sm">
          {{ contact.phone }}
        </span>
      </div>
    </div>
  </div>
</template>
