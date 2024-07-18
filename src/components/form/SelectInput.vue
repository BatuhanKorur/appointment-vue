<script setup lang="ts">
const model = defineModel({
  type: String,
  required: true,
})

defineProps({
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
  <div v-bind="$attrs">
    <div class="input-wrapper">
      <select :value="modelValue" @change="onChange" class="w-full text-base">
        <option v-for="(option, index) in options" :key="index" :selected="option === modelValue">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>
