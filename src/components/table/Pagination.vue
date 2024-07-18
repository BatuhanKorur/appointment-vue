<script setup lang="ts">
import PaginationButton from '@/components/table/PaginationButton.vue'
const model = defineModel({
  type: Object,
})

const emits = defineEmits(['update'])

/**
 * Handles the next page navigation for the table.
 * @description Increases the current page number if it's less than the total pages. Updates the tableData with the new showing range.
 */
function onNextPage() {
  if (model.value.currentPage < model.value.totalPages) {
    model.value.currentPage++
    emits('update')
  }
}

/**
 * Handles the previous page navigation for the table.
 * @description Decreases the current page number if it's greater than 1. Updates the tableData with the new showing range.
 */
function onPrevPage() {
  if (1 < model.value.currentPage) {
    model.value.currentPage--
    emits('update')
  }
}
</script>

<template>
  <div class="f-between w-full border-t px-5 py-4">
    <div>
      <p class="text-sm text-grey-700">
        Showing
        <span class="font-medium text-grey-800">{{ model.showingFrom }}</span>
        to
        <span class="font-medium text-grey-800">{{ model.showingTo }}</span>
        of
        <span class="font-medium text-grey-800">{{ model.totalItems }}</span>
        entries
      </p>
    </div>
    <div class="flex items-center space-x-6">
      <div class="flex h-[40px] rounded-md border border-grey-200">
        <PaginationButton v-if="model.totalPages !== 1"
                          class="rounded-l"
                          label="left"
                          @click="onPrevPage"
        />
        <PaginationButton label="1"
                          :active="model.currentPage === 1"
        />
        <PaginationButton v-if="model.totalPages > 2"
                          label="..."
                          :active="model.currentPage !== 1 && model.currentPage!== model.totalPages"
        />
        <PaginationButton v-if="model.totalPages > 3"
                          :label="model.totalPages"
                          :active="model.currentPage === model.totalPages"
        />
        <PaginationButton v-if="model.totalPages !== 1"
                          class="rounded-r"
                          label="right"
                          @click="onNextPage"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.per-page-select {
  @apply flex items-center space-x-2;

  label {
    @apply text-sm text-grey-700;
  }

  select {
    @apply border border-grey-200 h-[40px] min-w-[64px] px-2 rounded-md;
    @apply text-sm font-medium text-grey-800
  }
}
</style>
