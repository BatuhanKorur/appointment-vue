<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const model = defineModel({
  type: Boolean,
  default: false,
})

const popover = ref<HTMLElement>()
onClickOutside(popover, () => model.value = false)
</script>

<template>
  <div class="relative" ref="popover">
    <Transition name="fade" mode="out-in">
      <ul v-if="model" class="popover" v-bind="$attrs">
        <slot/>
      </ul>
    </Transition>
  </div>
</template>

<style scoped lang="postcss">
.popover {
  @apply absolute z-10 overflow-y-auto bg-white drop-shadow-lg mt-1;
  @apply border border-blue-500/25 rounded-lg;
  @apply min-h-20 max-h-64;
}
</style>
