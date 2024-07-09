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
    return 'text-blue-700'
  }
  if (Statuses.CANCELLED === props.status) {
    return 'text-red-700'
  }
  if (Statuses.COMPLETED === props.status) {
    return 'text-green-700'
  }
})
</script>

<template>
  <div class="bg-indigo-50 p-4 rounded-md flex items-center justify-between">
    <div>
      <p :class="statusClass">{{ status }}</p>
      <p class="text-sm text-grey-500">{{ fromNow }}</p>
    </div>
    <div class="text-right text-indigo-950 font-[425] text-sm">
      <p>{{ formatDate }}</p>
      <p>{{ formatTime }}</p>
    </div>
  </div>
</template>
