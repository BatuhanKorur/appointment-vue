<script setup lang="ts">
import { computed } from 'vue'
import { Statuses } from '@/types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const props = defineProps({
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
})

const formatDate = computed(() => {
  return dayjs(props.date).format('DD MMM, YYYY')
})

const formatTime = computed(() => {
  return dayjs(props.date).format('HH:mm')
})

const fromNow = computed(() => {
  return dayjs().to(dayjs(props.date))
})

const statusClass = computed(() => {
  if (Statuses.UPCOMING === props.status) {
    return 'bg-blue-100 text-blue-700'
  }
  if (Statuses.CANCELLED === props.status) {
    return 'bg-red-100 text-red-700'
  }
  if (Statuses.COMPLETED === props.status) {
    return 'bg-green-100/75 text-green-700'
  }
})
</script>

<template>
  <div class="p-4 rounded-md flex items-center justify-between" :class="statusClass">
    <div>
      <p class="text-[15px] font-medium">{{ status }}</p>
      <p class="text-[14px] opacity-60">{{ fromNow }}</p>
    </div>
    <div class="text-right text-grey-600 font-[430] text-sm">
      <p>{{ formatDate }}</p>
      <p>{{ formatTime }}</p>
    </div>
  </div>
</template>
