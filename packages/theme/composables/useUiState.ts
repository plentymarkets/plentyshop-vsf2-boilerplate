import { reactive, computed, ComputedRef } from '@nuxtjs/composition-api';

const state = reactive({
  isCartSidebarOpen: false,
  isWishlistSidebarOpen: false,
  isLoginModalOpen: false,
  isNewsletterModalOpen: false,
  isCategoryGridView: true,
  isFilterSidebarOpen: false,
  isMobileMenuOpen: false,
  isLangModalOpen: false
});

export interface UseUiStateResponse {
    isCartSidebarOpen: ComputedRef<boolean>,
    isWishlistSidebarOpen: ComputedRef<boolean>,
    isLoginModalOpen: ComputedRef<boolean>,
    isNewsletterModalOpen: ComputedRef<boolean>,
    isCategoryGridView: ComputedRef<boolean>,
    isFilterSidebarOpen: ComputedRef<boolean>,
    isMobileMenuOpen: ComputedRef<boolean>,
    isLangModalOpen: ComputedRef<boolean>,
    toggleCartSidebar: void,
    toggleWishlistSidebar: void,
    toggleLoginModal: void,
    toggleNewsletterModal: void,
    changeToCategoryGridView: void,
    changeToCategoryListView: void,
    toggleFilterSidebar: void,
    toggleMobileMenu: void,
    toggleLangModal: void
}

const useUiState = (): UseUiStateResponse => {
  const isMobileMenuOpen = computed(() => state.isMobileMenuOpen);
  const toggleMobileMenu = (): void => {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
  };

  const isCartSidebarOpen = computed(() => state.isCartSidebarOpen);
  const toggleCartSidebar = (): void => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isCartSidebarOpen = !state.isCartSidebarOpen;
  };

  const isWishlistSidebarOpen = computed(() => state.isWishlistSidebarOpen);
  const toggleWishlistSidebar = (): void => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isWishlistSidebarOpen = !state.isWishlistSidebarOpen;
  };

  const isLoginModalOpen = computed(() => state.isLoginModalOpen);
  const toggleLoginModal = (): void => {
    if (state.isMobileMenuOpen) toggleMobileMenu();
    state.isLoginModalOpen = !state.isLoginModalOpen;
  };

  const isNewsletterModalOpen = computed(() => state.isNewsletterModalOpen);
  const toggleNewsletterModal = (): void => {
    state.isNewsletterModalOpen = !state.isNewsletterModalOpen;
  };

  const isCategoryGridView = computed(() => state.isCategoryGridView);
  const changeToCategoryGridView = (): void => {
    state.isCategoryGridView = true;
  };
  const changeToCategoryListView = (): void => {
    state.isCategoryGridView = false;
  };

  const isFilterSidebarOpen = computed(() => state.isFilterSidebarOpen);
  const toggleFilterSidebar = (): void => {
    state.isFilterSidebarOpen = !state.isFilterSidebarOpen;
  };

  const isLangModalOpen = computed(() => state.isLangModalOpen);
  const toggleLangModal = (): void => {
    state.isLangModalOpen = !state.isLangModalOpen;
  };

  return {
    isCartSidebarOpen,
    isWishlistSidebarOpen,
    isLoginModalOpen,
    isNewsletterModalOpen,
    isCategoryGridView,
    isFilterSidebarOpen,
    isMobileMenuOpen,
    isLangModalOpen,
    toggleCartSidebar,
    toggleWishlistSidebar,
    toggleLoginModal,
    toggleNewsletterModal,
    changeToCategoryGridView,
    changeToCategoryListView,
    toggleFilterSidebar,
    toggleMobileMenu,
    toggleLangModal
  };
};

export default useUiState;
