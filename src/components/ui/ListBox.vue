<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
const box = ref()
const props = defineProps({
  empty: {
    type: Boolean,
    default: false,
  },
})
const model = defineModel({
  required: true,
})
onClickOutside(box, () => model.value = false)
</script>

<template>
  <div ref="box" class="relative">
    <Transition name="fade" mode="out-in">
      <div
        v-if="model"
        :class="empty ? 'h-24' :'h-64'"
        class="absolute bg-white border rounded-lg shadow-md w-full overflow-y-auto divide-y divide-grey-200"
      >
        <div v-if="empty" class="size-full f-center">
          <p class="text-md italic text-grey-500">Nothing found</p>
        </div>
        <slot v-if="!empty" />
      </div>
    </Transition>
  </div>
</template>
