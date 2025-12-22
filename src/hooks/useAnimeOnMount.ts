import { type AnimationOptions, animate } from "animejs";
import { useEffect, useRef } from "react";

export const useAnimeOnMount = (
  animationConfig: AnimationOptions,
  dependencies: any[] = [],
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    animate(elementRef.current, animationConfig);
  }, dependencies);

  return elementRef;
};

export const useAnimeOnIntersection = (
  animationConfig: AnimationOptions,
  threshold: number = 0.3,
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(element, animationConfig);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [animationConfig, threshold]);

  return elementRef;
};

export const useAnimeHover = (
  enterConfig: AnimationOptions,
  leaveConfig: AnimationOptions,
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleEnter = () => animate(element, enterConfig);
    const handleLeave = () => animate(element, leaveConfig);

    element.addEventListener("mouseenter", handleEnter);
    element.addEventListener("mouseleave", handleLeave);

    return () => {
      element.removeEventListener("mouseenter", handleEnter);
      element.removeEventListener("mouseleave", handleLeave);
    };
  }, [enterConfig, leaveConfig]);

  return elementRef;
};
