<script setup lang="ts">
const model = defineModel({
  type: String,
  required: true,
})

defineProps({
  label: {
    type: String,
    default: '',
  },
  dateOnly: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div>
    <label v-if="label">
      {{ label }}
    </label>
    <div class="input-wrapper">
      <input
        v-model="model"
        v-bind="$attrs"
        :type="dateOnly ? 'date' : 'datetime-local'"
      >
    </div>
  </div>
</template>
