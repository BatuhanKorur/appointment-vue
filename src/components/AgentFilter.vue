<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Agent } from '@/types'
import { Avatar, ListBox } from '@/components/ui'
import AgentItem from '@/components/AgentItem.vue'
import { fullName, initials } from '@/utils'

const props = defineProps<{ agents: Agent[] }>()
const model = defineModel({
  type: Array,
  required: true,
})
const previews = computed(() => props.agents.slice(0, 4))
const listShow = ref(false)

function onAgentSelect(agent: Agent) {
  const f = agent.field_id
  if (model.value.includes(f)) {
    model.value = model.value.filter((a) => a !== f)
  } else {
    model.value.push(f)
  }
}
</script>

<template>
  <div>
    <div class="inline-flex space-x-[-16px]">
      <Avatar
        v-for="agent in previews"
        :key="agent.id"
        :name="fullName(agent.first_name, agent.last_name)"
        :background="agent.color"
        :active="model.includes(agent.field_id)"
        @click="onAgentSelect(agent)"
      >
        {{ initials(agent.first_name, agent.last_name) }}
      </Avatar>
      <Avatar
        v-if="previews.length < props.agents.length"
        :label="`+${props.agents.length - previews.length }`"
        @click="listShow = true"
      />
    </div>
    <ListBox v-model="listShow" class="w-72">
      <div v-for="agent in agents" :key="agent.id" class="cursor-pointer">
        <AgentItem :agent="agent" class="p-4" @click="onAgentSelect(agent)" />
      </div>
    </ListBox>
  </div>
</template>
