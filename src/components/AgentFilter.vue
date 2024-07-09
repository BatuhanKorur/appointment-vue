<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Agent } from '@/types'
import { Avatar, ListBox } from '@/components/ui'
import AgentItem from '@/components/AgentItem.vue'

const props = defineProps<{ agents: Agent[] }>()
const listShow = ref(false)

// Array model for selected agents' field IDs'
const model = defineModel({
  type: Array,
  required: true,
})

// Limit to show 3 previews initially
const previews = computed(() => props.agents.slice(0, 3))

function onAgentSelect(agent: Agent) {
  const f = agent.field_id
  if (model.value.includes(f)) {
    model.value = model.value.filter((a) => a !== f)
  } else {
    model.value.push(f)
  }

  listShow.value = false
}
</script>

<template>
  <div>
    <div class="inline-flex space-x-[-16px]">
      <Avatar
        v-for="agent in previews"
        :key="agent.id"
        :agent="agent"
        :active="model.includes(agent.field_id)"
        @click="onAgentSelect(agent)"
      />
      <Avatar
        v-if="previews.length < props.agents.length"
        @click="listShow = true"
      >
        {{ props.agents.length - previews.length }}
      </Avatar>
    </div>
    <ListBox v-model="listShow" class="w-72">
      <div
        v-for="agent in agents"
        :key="agent.id"
        :class="model.includes(agent.field_id) ? 'agent-item selected' : 'agent-item'"
      >
        <AgentItem :agent="agent" class="p-4" @click="onAgentSelect(agent)" />
      </div>
    </ListBox>
  </div>
</template>

<style scoped lang="postcss">
.agent-item {
	@apply cursor-pointer;

	&.selected {
		@apply bg-blue-100;
	}

	&:not(.selected) {
		@apply bg-white hover:bg-grey-100;
	}
}
</style>
