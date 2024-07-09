<script setup lang="ts">
import FilterAgents from '@/components/filters/FilterAgents.vue'
import FilterDate from '@/components/filters/FilterDate.vue'
import FilterStatus from '@/components/filters/FilterStatus.vue'
import FilterSearch from '@/components/filters/FilterSearch.vue'
</script>

<template>
  <div class="grid grid-cols-1 gap-y-">
    <FilterAgents />
    <FilterStatus />
    <FilterDate />
    <FilterSearch />
  </div>
</template>
