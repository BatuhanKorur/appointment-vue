<script setup lang="ts">
const model = defineModel({
  type: Boolean,
  default: false,
})

defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="absolute">
    <div class="relative z-10" role="dialog">
      <!-- Background Overlay -->
      <Transition name="fade">
        <div v-if="model" class="fixed inset-0 bg-black/20 backdrop-blur-sm "/>
      </Transition>

      <!-- Drawer Container -->
      <Transition name="fade">
        <div v-if="model" class="absolute inset-0">
          <div class="drawer-container">
            <div @click="model = false" class="float-right">
              <div class="t-200 cursor-pointer rounded-lg bg-indigo-200/60 px-4 py-1.5 hover:bg-indigo-200/40">
                <p class="text-xs font-semibold text-indigo-700">Close</p>
              </div>
            </div>
            <div class="pb-3 pt-6 text-grey-800">
              <p class="text-3xl font-semibold">{{ title }}</p>
            </div>
            <div>
              <slot/>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.drawer-container {
  @apply bg-white;
  @apply fixed inset-y-0 right-0 p-6;
  @apply w-full md:max-w-lg lg:max-w-xl;
}
</style>
