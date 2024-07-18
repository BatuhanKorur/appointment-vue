<script setup lang="ts">
import { type PropType } from 'vue'
import { type Contact } from '@/types'
import { fullName } from '../utils'
defineProps({
  person: {
    type: Object as PropType<Contact>,
  },
})
</script>

<template>
<div>
  <Transition name="fade">
    <div v-if="person">
      <p class="font-medium text-grey-900">{{ person.first_name }} {{ person.last_name }}</p>
      <div class="-space-y-0.5 text-xs text-grey-500">
        <p>{{ person.email }}</p>
        <p>{{ person.phone }}</p>
      </div>
    </div>
  </Transition>
</div>
</template>
