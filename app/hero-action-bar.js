"use client";

export default function HeroActionBar() {
  function handleRefresh() {
    window.dispatchEvent(new CustomEvent("refresh-brief-request"));
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
    </div>
  );
}
