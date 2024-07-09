<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Airtable } from '@/server/api'
import type { Agent } from '@/types'
import AvatarGroup from '@/components/ui/AvatarGroup.vue'

const agents = ref<Agent[]>([])
onMounted(async() => {
  agents.value = await Airtable.getAll('agents')
})
</script>
<template>
  <AvatarGroup :avatars="agents" />
</template>
