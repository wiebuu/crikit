import { useEffect, useState, useCallback } from 'react';

const KEY = 'crickit-theme';

function initialTheme() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* storage unavailable */ }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Shared across components: a tiny pub/sub so every toggle stays in sync.
let current = typeof window !== 'undefined' ? initialTheme() : 'light';
const listeners = new Set();

function apply(theme) {
  current = theme;
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
  listeners.forEach((fn) => fn(theme));
}

export function useTheme() {
  const [theme, setTheme] = useState(current);
  useEffect(() => {
    listeners.add(setTheme);
    return () => listeners.delete(setTheme);
  }, []);
  const toggle = useCallback(() => apply(current === 'dark' ? 'light' : 'dark'), []);
  return { theme, toggle };
}

export function initTheme() {
  document.documentElement.dataset.theme = current;
}
