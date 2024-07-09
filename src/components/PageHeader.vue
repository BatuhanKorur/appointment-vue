<script setup lang="ts">
import { IconCirclePlus } from '@tabler/icons-vue'
import { AppButton } from '@/components/ui'
defineProps({
  length: {
    type: Number,
    default: 0,
  },
})
const emits = defineEmits(['createAppointment'])
</script>

<template>
  <div class="flex flex-col-reverse mt-4 md:flex-row md:justify-between md:mt-8 md:mb-4">
    <p class="mt-6 mb-2 space-x-1 md:flex md:flex-col md:mt-0 md:mb-0">
      <span class="text-base font-semibold text-grey-950 md:text-2xl">{{ length }}</span>
      <span class="text-base text-grey-500">Appointments Found</span>
    </p>
    <AppButton label="Create Appointment" :icon="IconCirclePlus" @click="emits('createAppointment')" />
  </div>
</template>
