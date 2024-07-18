<script setup lang="ts">
import { type PropType, computed } from 'vue'
import { Status } from '@/types'
import { dateUtils } from '@/utils'
import Badge from '@/components/Badge.vue'

const props = defineProps({
  status: {
    type: String as PropType<Status>,
    default: '',
  },
  date: {
    type: String,
    required: true,
  },
})

const statusColor = computed(() => {
  switch (props.status) {
    case 'Upcoming': {
      return 'bg-blue-100 text-blue-950'
    }
    case 'Cancelled': {
      return 'bg-red-100'
    }
    case 'Completed': {
      return 'bg-green-100 text-green-950'
    }
    default: {
      return 'bg-grey-100'
    }
  }
})
</script>

<template>
  <div class="relative flex flex-col rounded px-3 py-2.5" :class="statusColor">
    <div v-if="dateUtils.datePassed(date) && status === Status.Upcoming" class="absolute -bottom-1 -right-1">
      <Badge msg="Appointment date has passed!"/>
    </div>
    <div class="f-between">
      <p class="text-sm font-medium">{{ status }}</p>
      <p class="text-xs">{{ dateUtils.dateFromNow(date) }}</p>
    </div>
    <div class="flex items-center space-x-1.5 text-xs opacity-60">
      <p>{{ dateUtils.formatDate(date) }}</p>
      <p>({{ dateUtils.formatTime(date) }})</p>
    </div>
  </div>
</template>
