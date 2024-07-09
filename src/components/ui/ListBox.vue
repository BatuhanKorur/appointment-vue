<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
const box = ref()
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
        class="absolute bg-white border rounded-lg shadow-md w-full h-64 overflow-y-auto divide-y divide-grey-200"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>
