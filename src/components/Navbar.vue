<script setup lang="ts">
import FilterAgents from '@/components/filters/FilterAgents.vue'
import FilterDate from '@/components/filters/FilterDate.vue'
import FilterStatus from '@/components/filters/FilterStatus.vue'
import FilterSearch from '@/components/filters/FilterSearch.vue'
</script>

<template>
  <div class="border-b border-grey-300 py-6 mb-6 grid grid-cols-10 gap-x-4">
    <FilterAgents class="col-span-2" />
    <FilterStatus class="col-span-2" />
    <FilterDate class="col-span-2" />
    <FilterSearch class="col-span-4" />
  </div>
</template>
