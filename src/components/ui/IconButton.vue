<script setup lang="ts">
defineProps({
  size: {
    type: String,
    default: '32',
  },
  icon: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <div class="inline-flex">
    <button
      class="rounded-full bg-grey-200 f-center border border-grey-300 t-300 hover:bg-opacity-75"
      :style="{
        width: size + 'px',
        height: size + 'px',
      }"
    >
      <component
        :is="icon"
        :size="Number(size) / 2.5"
        class="text-grey-600"
        stroke="3"
      />
    </button>
  </div>
</template>
