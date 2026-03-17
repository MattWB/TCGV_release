import { useLayoutEffect, useRef } from "react";

export function useScrollLockFrames() {
  const ref = useRef({ active: false, x: 0, y: 0, ticks: 0 });

  function arm(frames = 3) {
    ref.current = {
      active: true,
      x: window.scrollX,
      y: window.scrollY,
      ticks: frames,
    };
  }

  useLayoutEffect(() => {
    const lock = ref.current;
    if (!lock.active || lock.ticks <= 0) return;

    const step = () => {
      const l = ref.current;
      if (!l.active || l.ticks <= 0) return;
      window.scrollTo(l.x, l.y);
      l.ticks -= 1;
      if (l.ticks <= 0) l.active = false;
    };

    step();
    const id1 = requestAnimationFrame(() => {
      step();
      const id2 = requestAnimationFrame(step);
      return () => cancelAnimationFrame(id2);
    });

    return () => cancelAnimationFrame(id1);
  });

  return { armScrollLock: arm };
}
