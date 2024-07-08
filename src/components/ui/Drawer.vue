<script setup lang="ts">
import { IconX } from '@tabler/icons-vue'
import IconButton from '@/components/ui/IconButton.vue'
const model = defineModel({
  type: Boolean,
  default: false,
})

defineProps({
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div class="relative z-10" role="dialog" aria-modal="true">
    <!-- Background Overlay -->
    <Transition name="fade" mode="out-in">
      <div v-if="model" class="fixed inset-0 bg-black/10 backdrop-blur-sm " />
    </Transition>

    <!-- Drawer Container -->
    <Transition name="drawer">
      <div v-if="model" class="absolute inset-0">
        <div class="fixed inset-y-0 right-0 bg-white w-full max-w-lg p-6">
          <div class="flex justify-end">
            <IconButton size="40" :icon="IconX" @click="model = false" />
          </div>
          <component
            :is="icon"
            v-if="icon"
            size="40"
            class="text-grey-300 -ml-px"
          />
          <div class="pt-2 pb-6">
            <p class="text-3xl font-medium text-grey-800">{{ title }}</p>
          </div>
          <div>
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
