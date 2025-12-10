import { useEffect, useState } from "react";

/**
 * Hook to detect if the device is mobile
 * Uses matchMedia for better performance than resize events
 * @param breakpoint - The breakpoint to check (default: 768px)
 * @returns boolean indicating if device is mobile
 */
export const useIsMobile = (breakpoint = 768): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);

  return isMobile;
};
