<script setup lang="ts">
import { computed } from 'vue'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue'

const model = defineModel({
  type: Object,
})
const emits = defineEmits(['update'])

/**
 * Handles the next page navigation for the table.
 * @description Increases the current page number if it's less than the total pages. Updates the tableData with the new showing range.
 */
function handleNext() {
  if (model.value.currentPage < model.value.totalPages) {
    model.value.currentPage++
    emits('update')
  }
}

/**
 * Handles the previous page navigation for the table.
 * @description Decreases the current page number if it's greater than 1. Updates the tableData with the new showing range.
 */
function handlePrev() {
  if (1 < model.value.currentPage) {
    model.value.currentPage--
    emits('update')
  }
}

/**
 * Handles the page navigation for the table.
 * @param page
 */
function handlePage(page: number) {
  model.value.currentPage = page
  emits('update')
}

/**
 * Calculates the range of items to be displayed on the current page.
 */
const isMultiPage = computed(() => 1 !== model.value.totalPages)
const onFirstPage = computed(() => 1 === model.value.currentPage)
const onLastPage = computed(() => model.value.currentPage === model.value.totalPages)
const onBetweenPages = computed(() => 1 !== model.value.currentPage && model.value.currentPage !== model.value.totalPages)
</script>

<template>
  <div class="f-between border-t border-grey-200 px-5 pb-3 pt-4">
    <div>
      <p class="text-sm text-grey-500 md:text-base">
        Showing
        <span class="font-medium text-grey-800">{{ model.showingFrom }}</span>
        to
        <span class="font-medium text-grey-800">{{ model.showingTo }}</span>
        of
        <span class="font-medium text-grey-900">{{ model.totalItems }}</span>
        entries
      </p>
    </div>
    <div class="p-buttons">
      <button v-if="isMultiPage" @click="handlePrev">
        <IconChevronLeft class="icon"/>
      </button>
      <button :class="{'active': onFirstPage}" @click="handlePage(1)">
        <span>1</span>
      </button>
      <button v-if="isMultiPage" :class="{'active': onBetweenPages}">
        <span>...</span>
      </button>
      <button v-if="isMultiPage"
              :class="{'active': onLastPage}"
              @click="handlePage(model.totalPages)">
        <span>{{ model.totalPages }}</span>
      </button>
      <button v-if="isMultiPage"
              @click="handleNext">
        <IconChevronRight class="icon"/>
      </button>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.p-buttons {
  @apply flex border border-grey-200 rounded-md;
}

button {
  @apply flex items-center justify-center transition duration-150 ease-in-out;
  @apply cursor-pointer h-[40px] w-[48px] hover:bg-grey-100;

  &:first-of-type {
    @apply rounded-l-md;
  }

  &:last-of-type {
    @apply rounded-r-md;
  }

  &.active {
    @apply bg-blue-600 text-white;
  }

  .icon {
    @apply size-4 text-grey-700;
  }

  span {
    @apply text-xs font-medium leading-none;
  }
}
</style>
