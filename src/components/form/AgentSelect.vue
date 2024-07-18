<script setup lang="ts">
import { ref, onMounted, type PropType } from 'vue'
import { type Agent } from '@/types'
import AgentItem from '@/components/AgentItem.vue'
import AgentAvatar from '@/components/AgentAvatar.vue'
import SelectPopover from '@/components/form/SelectPopover.vue'

const model = defineModel({
  type: Array,
  default: [],
})

const props = defineProps({
  agents: {
    type: Object as PropType<Agent[]>,
    required: true,
  },
})

const isExpanded = ref(false)
const preview = ref<Agent[]>([])
const others = ref<Agent[]>([])

onMounted(() => {
  if (4 < props.agents.length) {
    preview.value = props.agents.slice(0, 4)
    others.value = props.agents.slice(4)
  } else {
    preview.value = props.agents
  }
})

function onAgentSelect(agent: Agent) {
  if (model.value.includes(agent.field_id)) {
    model.value = model.value.filter((id) => id !== agent.field_id)
  } else {
    model.value.push(agent.field_id)
  }
}
</script>

<template>
  <div>
    <div class="inline-flex space-x-[-16px]">
      <AgentAvatar v-for="agent in preview"
                   :key="agent.field_id"
                   :agent="agent"
                   :selected="model.includes(agent.field_id)"
                   @click="onAgentSelect(agent)"/>
      <AgentAvatar v-if="others.length > 0" :label="'+' + others.length" @click="isExpanded = true"/>
    </div>
    <SelectPopover v-model="isExpanded">
      <AgentItem v-for="agent in others"
                 :key="agent.field_id"
                 :person="agent"
                 :selected="model.includes(agent.field_id)"
                 @click="onAgentSelect(agent)"/>
    </SelectPopover>
  </div>
</template>
