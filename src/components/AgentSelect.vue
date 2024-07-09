<script setup lang="ts">
import { ref } from 'vue'
import AgentItem from '@/components/AgentItem.vue'
import { AvatarGroup, ListBox } from '@/components/ui'
import type { Agent } from '@/types'

defineProps<{ agents: Agent[] }>()
const listShow = ref(false)
</script>

<template>
  <div>
    <AvatarGroup :avatars="agents" @load-more="listShow = true" />
    <ListBox v-model="listShow" class="w-72">
      <div v-for="agent in agents" :key="agent.id" class="listbox-item">
        <AgentItem :agent="agent" class="p-4" />
      </div>
    </ListBox>
  </div>
</template>

<style scoped lang="postcss">
.listbox-item {
	@apply cursor-pointer;
}
</style>
