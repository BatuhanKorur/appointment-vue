<script setup lang="ts">
/**
 * This component is a wrapper for a loading spinner. It uses a `Transition` component to smoothly transition between the spinner and a blank screen when the `model` prop changes.
 * @param {Boolean} model - A boolean value that determines whether the spinner should be displayed. Defaults to `false`.
 */
const model = defineModel({
  type: Boolean,
  default: false,
})
</script>

<template>
  <div class="h-full min-h-screen bg-grey-50 p-4 lg:p-6">
    <div class="mx-auto max-w-screen-xl">
      <Transition name="fade" mode="out-in">
        <slot v-if="model" />
        <div v-else class="absolute inset-0 z-50 h-screen w-screen bg-black/15">
          <div class="f-center size-full">
            <svg class="size-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
              <path
                fill="none"
                stroke="#5A9DFF"
                stroke-width="15"
                stroke-linecap="round"
                stroke-dasharray="300 385"
                stroke-dashoffset="0"
                d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  calcMode="spline"
                  dur="2"
                  values="685;-685"
                  keySplines="0 0 1 1"
                  repeatCount="indefinite"
                /></path>
            </svg>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
