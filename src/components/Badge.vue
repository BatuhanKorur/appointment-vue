<script setup lang="ts">
import { ref } from 'vue'
import { useElementHover } from '@vueuse/core'
import { IconExclamationMark } from '@tabler/icons-vue'
const badge = ref<HTMLElement>()
const hover = useElementHover(badge)
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div ref="badge" class="relative">
    <div class="f-center size-5 rounded-full bg-red-500">
      <IconExclamationMark class="size-4 text-white"/>
    </div>
    <Transition name="fade">
      <div v-if="hover" class="absolute right-0">
        <div class="rounded-md bg-red-500/10 px-2 py-0.5 text-red-900">
          <p class="text-nowrap text-xs">{{ msg }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>
