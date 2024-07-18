<script setup lang="ts">
import { type PropType } from 'vue'
interface col {
  label: string
  classStyle: string
}

defineProps({
  cols: {
    type: Array as PropType<col[]>,
    required: true,
  },
})
</script>

<template>
  <div class="table-wrapper">
    <table>
      <colgroup>
        <col v-for="col in cols" :key="col.label" :class="col.classStyle" />
      </colgroup>
      <thead>
      <tr>
        <th scope="col" v-for="(col, index) in cols" :key="index">
          {{ col.label }}
        </th>
      </tr>
      </thead>
      <tbody><slot/></tbody>
    </table>
    <slot name="footer" />
  </div>
</template>

<style scoped lang="postcss">
.table-wrapper {
  @apply min-w-full overflow-x-scroll bg-white;
  @apply border border-grey-200 rounded-lg;

  th {
    @apply text-left text-[13.5px] font-medium text-grey-800;
    @apply px-5 py-3.5;
  }

  thead {
    @apply border-b border-grey-200;
  }

  tbody {
    @apply divide-y divide-grey-200;
  }
}
</style>
