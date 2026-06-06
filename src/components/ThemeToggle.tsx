"use client";

import React, { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_EVENT = "themechange";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

// Read the current theme straight from the DOM (set pre-paint by the inline
// script in layout.tsx), so it stays in sync without setState-in-effect.
function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

// During SSR the document is unavailable; default to light to match the
// server-rendered markup and avoid hydration mismatches.
function getServerSnapshot() {
  return false;
}

const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  return (
    <button
      onClick={toggle}
      type="button"
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      title={isDark ? "Mode terang" : "Mode gelap"}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors dark:border-surface-border dark:text-gray-300 dark:hover:bg-white/5 ${
        className ?? ""
      }`}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
};

export default ThemeToggle;
