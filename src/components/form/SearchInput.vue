<script setup lang="ts">
import { IconSearch, IconX } from '@tabler/icons-vue'
const model = defineModel({
  type: String,
  required: true,
})
</script>

<template>
    <div class="input-wrapper">
      <div class="icon">
        <IconSearch class="size-5"/>
      </div>
      <input v-model="model" type="text" placeholder="Search">
      <Transition name="fade" mode="out-in">
      <div v-if="model.length > 0" @click="model = ''">
        <div class="clear">
          <IconX class="text-grey-600"/>
        </div>
      </div>
      </Transition>
    </div>
</template>
