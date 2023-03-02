export interface Pagination {
  totalPages: number,
  currentPage: number,
  totalItems: number,
  itemsPerPage: number,
  pageOptions: number[]
}
function getTotalPages(pagination: Pagination): number {
  return pagination ? pagination.totalPages : 0;
}

function getCurrentPage(pagination: Pagination): number {
  return pagination ? pagination.currentPage : 0;
}

export const paginationGetters = {
  getTotalPages,
  getCurrentPage
};
