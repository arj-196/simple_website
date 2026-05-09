"use client";

import { useCallback, useEffect, useState } from "react";

const AUTO_REFRESH_MS = 25000;
const HISTORY_LIMIT = 5;

const initialBrief = {
  label: "Loading",
  summary: "Fetching dynamic content...",
  focus: "...",
  signal: "...",
  runId: "...",
  timestamp: ""
};

export default function RefreshPanel() {
  const [brief, setBrief] = useState(initialBrief);
  const [refreshHistory, setRefreshHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState(true);
  const [nextRefreshAt, setNextRefreshAt] = useState(() => Date.now() + AUTO_REFRESH_MS);
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState(() =>
    Math.ceil(AUTO_REFRESH_MS / 1000)
  );

  const loadBrief = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/content", { cache: "no-store" });
      const data = await response.json();
      setBrief(data);
      setRefreshHistory((previous) => [data, ...previous].slice(0, HISTORY_LIMIT));
    } catch (error) {
      console.error(error);
      const failedBrief = {
        ...initialBrief,
        label: "Refresh failed",
        summary: "Dynamic content could not be loaded.",
        runId: "--",
        signal: "Unavailable",
        timestamp: new Date().toISOString()
      };
      setBrief(failedBrief);
      setRefreshHistory((previous) => [failedBrief, ...previous].slice(0, HISTORY_LIMIT));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBrief();

    function handleHeroRefresh() {
      loadBrief();
    }

    window.addEventListener("refresh-brief-request", handleHeroRefresh);

    return () => {
      window.removeEventListener("refresh-brief-request", handleHeroRefresh);
    };
  }, [loadBrief]);

  useEffect(() => {
    if (!isAutoRefreshEnabled) {
      return;
    }

    setNextRefreshAt(Date.now() + AUTO_REFRESH_MS);

    const autoRefreshTimer = window.setInterval(() => {
      setNextRefreshAt(Date.now() + AUTO_REFRESH_MS);
      loadBrief();
    }, AUTO_REFRESH_MS);

    return () => {
      window.clearInterval(autoRefreshTimer);
    };
  }, [isAutoRefreshEnabled, loadBrief]);

  useEffect(() => {
    if (!isAutoRefreshEnabled) {
      return;
    }

    function updateCountdown() {
      const msRemaining = Math.max(0, nextRefreshAt - Date.now());
      setSecondsUntilRefresh(Math.ceil(msRemaining / 1000));
    }

    updateCountdown();
    const countdownTimer = window.setInterval(updateCountdown, 250);

    return () => {
      window.clearInterval(countdownTimer);
    };
  }, [isAutoRefreshEnabled, nextRefreshAt]);

  return (
    <article id="live-refresh-panel" className="panel live-panel">
      <p className="panel-label">Live refresh brief</p>
      <h2>{brief.label}</h2>
      <p className="panel-copy">{brief.summary}</p>

      <div className="refresh-controls">
        <button
          type="button"
          className="refresh-brief-button"
          onClick={loadBrief}
          disabled={isLoading}
        >
          {isLoading ? "Refreshing..." : "Refresh brief"}
        </button>
        <button
          type="button"
          className={`refresh-toggle-button ${isAutoRefreshEnabled ? "is-on" : "is-off"}`}
          onClick={() => setIsAutoRefreshEnabled((previous) => !previous)}
        >
          {isAutoRefreshEnabled ? "Pause auto-refresh" : "Resume auto-refresh"}
        </button>
      </div>

      <div className="stats">
        <div>
          <span className="stat-name">Focus</span>
          <strong>{brief.focus}</strong>
        </div>
        <div>
          <span className="stat-name">Signal</span>
          <strong>{brief.signal}</strong>
        </div>
        <div>
          <span className="stat-name">Run</span>
          <strong>{typeof brief.runId === "number" ? `#${brief.runId}` : brief.runId}</strong>
        </div>
      </div>

      <p className="timestamp">
        {brief.timestamp
          ? `Last refresh: ${new Date(brief.timestamp).toLocaleString()}`
          : ""}
      </p>
      <p className="timestamp">
        {isAutoRefreshEnabled
          ? `Auto-refresh is on · next refresh in ${secondsUntilRefresh}s.`
          : "Auto-refresh is off."}
      </p>

      {refreshHistory.length > 0 ? (
        <div className="refresh-history" aria-live="polite">
          <p className="history-label">Recent refreshes</p>
          <ul className="refresh-history-list">
            {refreshHistory.map((entry, index) => (
              <li key={`${entry.runId}-${entry.timestamp}-${index}`}>
                <span className="history-time">
                  {entry.timestamp
                    ? new Date(entry.timestamp).toLocaleTimeString()
                    : "--:--:--"}
                </span>
                <span className="history-text">
                  {entry.label}
                  {typeof entry.runId === "number" ? ` · #${entry.runId}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
