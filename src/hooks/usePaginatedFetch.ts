import { useCallback, useEffect, useState } from "react";

export interface PaginatedResponse<T> {
  status: number;
  data?: {
    total?: number;
    page?: number;
    limit?: number;
    total_pages?: number;
    has_next?: boolean;
    has_previous?: boolean;
    [key: string]: T[] | number | boolean | undefined;
  };
  message?: string;
}

export interface UsePaginatedFetchOptions<T, R> {
  /** API fetch function that takes (page, limit) and returns paginated response */
  fetchFn: (page: number, limit: number) => Promise<PaginatedResponse<T>>;
  /** Number of items per page */
  itemsPerPage: number;
  /** Key in response.data that contains the items array */
  dataKey: string;
  /** Optional transform function to process items after fetch */
  transform?: (items: T[]) => R[];
  /** Whether to fetch on mount (default: true) */
  fetchOnMount?: boolean;
}

export interface UsePaginatedFetchReturn<R> {
  /** Current items for the page */
  items: R[];
  /** Initial loading state */
  loading: boolean;
  /** Pagination loading state */
  paginationLoading: boolean;
  /** Error message if any */
  error: string | null;
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items */
  totalItems: number;
  /** Go to next page */
  goToNextPage: () => void;
  /** Go to previous page */
  goToPrevPage: () => void;
  /** Go to specific page */
  goToPage: (page: number) => void;
  /** Retry the current fetch */
  retry: () => void;
  /** Check if can go to next page */
  canGoNext: boolean;
  /** Check if can go to previous page */
  canGoPrev: boolean;
}

/**
 * Custom hook for paginated data fetching with loading states
 * Eliminates repetitive pagination logic across components
 */
export function usePaginatedFetch<T, R = T>({
  fetchFn,
  itemsPerPage,
  dataKey,
  transform,
  fetchOnMount = true,
}: UsePaginatedFetchOptions<T, R>): UsePaginatedFetchReturn<R> {
  const [items, setItems] = useState<R[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = useCallback(
    async (page: number) => {
      try {
        if (page === 1) {
          setLoading(true);
        } else {
          setPaginationLoading(true);
        }
        setError(null);

        const response = await fetchFn(page, itemsPerPage);

        if (response.status === 200 && response.data) {
          const rawItems = (response.data[dataKey] as T[]) || [];
          const processedItems = transform
            ? transform(rawItems)
            : (rawItems as unknown as R[]);

          setItems(processedItems);
          setTotalItems(response.data.total || processedItems.length);
        } else {
          setItems([]);
          setTotalItems(0);
        }
      } catch (err) {
        console.error(`Error fetching ${dataKey}:`, err);
        setError(`Failed to load ${dataKey}. Please try again later.`);
        setItems([]);
        setTotalItems(0);
      } finally {
        setLoading(false);
        setPaginationLoading(false);
      }
    },
    [fetchFn, itemsPerPage, dataKey, transform],
  );

  useEffect(() => {
    if (fetchOnMount) {
      fetchData(currentPage);
    }
  }, [currentPage, fetchData, fetchOnMount]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const retry = () => {
    fetchData(currentPage);
  };

  return {
    items,
    loading,
    paginationLoading,
    error,
    currentPage,
    totalPages,
    totalItems,
    goToNextPage,
    goToPrevPage,
    goToPage,
    retry,
    canGoNext: currentPage < totalPages,
    canGoPrev: currentPage > 1,
  };
}
