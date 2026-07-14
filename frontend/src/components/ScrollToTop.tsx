import { useEffect } from "react";
import { useLocation } from "wouter";

function scrollToHash(hash: string, attempts = 0) {
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (attempts < 12) {
    setTimeout(() => scrollToHash(hash, attempts + 1), 80);
  }
}

export function ScrollToTop() {
  const [location] = useLocation();

  // On route change: scroll to hash section, or reset to top
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => scrollToHash(hash), 60);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location]);

  // Handle hash-only changes on the SAME route (e.g. clicking /about#vision while already on /about)
  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash;
      if (hash) scrollToHash(hash);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
