"use client";

import { useEffect, useState } from "react";

export default function HeroActionBar() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const initialTheme =
      storedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    setMounted(true);
  }, []);

  function handleRefresh() {
    window.dispatchEvent(new CustomEvent("refresh-brief-request"));
  }

  function handleThemeToggle() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }

  return (
    <div className="hero-actions" aria-label="Quick actions">
      <a className="hero-action hero-action-primary" href="#live-refresh-panel">
        View latest run
      </a>
      <button
        type="button"
        className="hero-action hero-action-secondary"
        onClick={handleRefresh}
      >
        Trigger refresh
      </button>
      <button
        type="button"
        className="hero-action hero-action-secondary"
        onClick={handleThemeToggle}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {mounted ? (theme === "dark" ? "Light mode" : "Dark mode") : "Theme"}
      </button>
    </div>
  );
}
