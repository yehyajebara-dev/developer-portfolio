"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which of the given section ids is currently centered in the viewport.
 * Keyed by id content rather than array identity, so callers may pass a
 * freshly built array without re-subscribing on every render.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState("");
  const idKey = ids.join(",");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entering = entries.find((entry) => entry.isIntersecting);
        if (entering) {
          setActive(entering.target.id);
          return;
        }
        // Nothing observed is intersecting — if the section that just left was the
        // active one (e.g. scrolling through an untracked section in between),
        // clear it instead of leaving a stale highlight.
        for (const entry of entries) {
          setActive((prev) => (prev === entry.target.id ? "" : prev));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const id of idKey.split(",")) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }

    function onScroll() {
      if (window.scrollY < 200) setActive("");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [idKey]);

  return active;
}
