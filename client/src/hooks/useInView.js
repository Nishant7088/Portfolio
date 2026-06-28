import { useEffect, useRef, useState } from "react";

export const useInView = (options = { threshold: 0.15, triggerOnce: true }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.triggerOnce) observer.unobserve(el);
      } else if (!options.triggerOnce) {
        setIsInView(false);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
};
