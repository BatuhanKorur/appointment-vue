<script setup lang="ts">
const model = defineModel({
  type: String,
})

defineProps({
  label: {
    type: String,
    default: null,
  },
})
</script>

<template>
  <div>
    <label v-if="label">
      {{ label }}
    </label>
    <div class="input-wrapper">
      <input v-model="model" type="text">
    </div>
  </div>
</template>
