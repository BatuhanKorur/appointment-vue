<script setup lang="ts">
defineProps<{
  cols: {
    label: string
    classStyle: string
  }[]
}>()
</script>

<template>
  <div class="overflow-x-auto rounded-lg border border-grey-200 bg-white">
    <div class="inline-block min-w-full">
      <table class="min-w-full">
        <colgroup>
          <col v-for="col in cols" :key="col.label" :class="col.classStyle"/>
        </colgroup>
        <thead class="border-b border-grey-200">
        <tr>
          <th v-for="(col, index) in cols"
              :key="index"
              scope="col"
              class="px-5 py-3.5 text-left text-xs font-medium text-grey-800"
          >
            {{ col.label }}
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-grey-200">
        <slot/>
        </tbody>
      </table>
      <slot name="footer"/>
    </div>
  </div>
</template>
