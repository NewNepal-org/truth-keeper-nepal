/**
 * Type extension for window object to include React Query SSR state
 */
export interface WindowWithReactQueryState extends Window {
  __REACT_QUERY_STATE__?: unknown;
}

/**
 * Get the dehydrated React Query state from the window object (if available)
 * This is used during SSR hydration to restore server-side query data
 */
export function getDehydratedState(): unknown {
  if (typeof window === 'undefined') {
    return undefined;
  }
  return (window as WindowWithReactQueryState).__REACT_QUERY_STATE__;
}
