<script setup lang="ts">
import type { Contact } from '@/types'
import { fullName } from '@/utils'
import { IconMail, IconPhone } from '@tabler/icons-vue'
defineProps<{
  contact: Contact
}>()
</script>

<template>
  <div class="space-y-0.5">
    <p class="text-grey-900 font-medium">
      {{ fullName(contact) }}
    </p>
    <div class="flex flex-col space-y-1">
      <div class="flex items-center text-grey-700 space-x-1">
        <IconMail size="20" stroke="1.5" />
        <span class="text-[15px] leading-none">
          {{ contact.email }}
        </span>
      </div>
      <div class="flex items-center text-grey-700 space-x-1">
        <IconPhone size="20" stroke="1.5" />
        <span class="text-[15px] leading-none">
          {{ contact.phone }}
        </span>
      </div>
    </div>
  </div>
</template>
