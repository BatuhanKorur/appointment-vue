<script setup lang="ts">
import { ref, onMounted, type PropType } from 'vue'
import { type Agent } from '@/types'
import AgentItem from '@/components/AgentItem.vue'
import AgentAvatar from '@/components/AgentAvatar.vue'
import SelectPopover from '@/components/form/SelectPopover.vue'

/**
 * @model model: Array of agent.field_id
 * @description Selected agents model. Array includes agent.field_id
 */
const model = defineModel({
  type: Array as PropType<string[]>,
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

/**
 * Handle agent selection
 * If includes, removes agent.field_id from model. Otherwise, adds agent.field_id to model
 * @param fieldId
 */
function onAgentSelect(fieldId: string) {
  if (model.value.includes(fieldId)) {
    model.value = model.value.filter((id) => id !== fieldId)
  } else {
    model.value.push(fieldId)
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
                   @click="onAgentSelect(agent.field_id)"/>
      <AgentAvatar v-if="others.length > 0" :label="'+' + others.length" @click="isExpanded = true"/>
    </div>
    <SelectPopover v-model="isExpanded">
      <AgentItem v-for="agent in others"
                 :key="agent.field_id"
                 :person="agent"
                 :selected="model.includes(agent.field_id)"
                 @click="onAgentSelect(agent.field_id)"/>
    </SelectPopover>
  </div>
</template>
