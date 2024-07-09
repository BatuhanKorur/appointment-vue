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
  options: {
    type: Array,
    required: true,
  },
})

function onChange(event: Event) {
  const target = event.target as HTMLSelectElement
  model.value = target.value
}
</script>

<template>
  <div>
    <label v-if="label">
      {{ label }}
    </label>
    <div class="input-wrapper">
      <select :value="modelValue" @change="onChange">
        <option v-for="(option, index) in options" :key="index" :selected="option === modelValue">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>
