<script setup lang="ts">
const model = defineModel({
  type: String,
})
</script>

<template>
  <div>
    <div class="input-wrapper">
      <input v-model="model"
             type="text"
             v-bind="$attrs"
      >
    </div>
  </div>
</template>
