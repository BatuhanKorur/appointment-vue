import { reactive, toRefs } from 'vue'

const state = reactive({
  // Pages
  perPage: 10,
  currentPage: 1,
  totalPages: 0,

  // Showing
  showingFrom: 0,
  showingTo: 0,
  totalItems: 0,
})

/**
 * Pagination utility function that manages the pagination state and provides methods to update the showing range and reset the pagination.
 *
 * @param items - The array of items to be paginated. Defaults to an empty array.
 * @returns An object containing the pagination state and methods to update the showing range and reset the pagination.
 */
export default function usePagination(items: unknown[] = []): {
  perPage: number
  currentPage: number
  totalPages: number
  showingFrom: number
  showingTo: number
  totalItems: number
  updateShowingRange: () => unknown[]
} {
  state.totalItems = items.length

  function updateShowingRange(): unknown[] {
    const startIndex = (state.currentPage - 1) * state.perPage
    const endIndex = startIndex + state.perPage

    state.showingFrom = startIndex + 1
    state.showingTo = endIndex > state.totalItems ? state.totalItems : endIndex

    state.totalPages = Math.ceil(state.totalItems / state.perPage)
    const sorted = items.sort((a, b) => new Date(b.appointment_date) - new Date(a.appointment_date))
    return sorted.slice(startIndex, endIndex)
  }

  return {
    ...toRefs(state),
    updateShowingRange,
  }
}
