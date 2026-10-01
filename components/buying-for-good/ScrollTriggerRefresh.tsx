"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollTriggerRefresh() {
  useEffect(() => {
    let frame = 0;
    let refreshQueued = false;

    const refresh = () => {
      if (refreshQueued) return;
      refreshQueued = true;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        refreshQueued = false;
        ScrollTrigger.refresh();
      });
    };

    const images = Array.from(document.images);
    const cleanups = images.map((image) => {
      if (!image.complete) {
        image.addEventListener("load", refresh, { once: true });
        image.addEventListener("error", refresh, { once: true });
        return () => {
          image.removeEventListener("load", refresh);
          image.removeEventListener("error", refresh);
        };
      }
      return () => undefined;
    });

    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(document.documentElement);

    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("resize", refresh);

    const fontReady = document.fonts?.ready.then(refresh).catch(() => undefined);

    refresh();

    return () => {
      cancelAnimationFrame(frame);
      cleanups.forEach((cleanup) => cleanup());
      resizeObserver.disconnect();
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      void fontReady;
    };
  }, []);

  return null;
}
