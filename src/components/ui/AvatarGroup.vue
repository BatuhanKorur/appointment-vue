<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Agent } from '@/types'
import Avatar from '@/components/ui/Avatar.vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  avatars: {
    type: Array,
    default: () => [],
  },
})

const box = ref()
const isActive = ref(false)

const previews: Agent[] = computed(() => {
  return props.avatars.slice(0, 4)
})

onClickOutside(box, () => isActive.value = false)
</script>

<template>
  <div>
    <div class="inline-flex space-x-[-16px]">
      <Avatar
        v-for="avatar in previews"
        :key="avatar.id"
        :background="avatar.color"
      >
        {{ avatar.first_name.charAt(0) + avatar.last_name.charAt(0) }}
      </Avatar>
      <Avatar
        v-if="previews.length < props.avatars.length"
        :label="`+${props.avatars.length - previews.length }`"
        @click="isActive = !isActive"
      />
    </div>
    <Transition name="fade" mode="out-in">
      <div
        v-if="isActive"
        ref="box"
        class="absolute w-72 h-64 bg-white border border-grey-200 shadow-xl rounded-lg overflow-y-scroll divide-y"
      >
        <div v-for="avatar in avatars" :key="avatar.id" class="flex items-center p-2 space-x-1">
          <Avatar :background="avatar.color" size="40">
            {{ avatar.first_name.charAt(0) + avatar.last_name.charAt(0) }}
          </Avatar>
          <div class="space-x-1 text-grey-900 font-[440]">
            <span>{{ avatar.first_name }}</span>
            <span>{{ avatar.last_name }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
