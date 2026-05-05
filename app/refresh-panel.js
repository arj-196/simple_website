"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    let active = true;

    async function loadBrief() {
      try {
        const response = await fetch("/api/content", { cache: "no-store" });
        const data = await response.json();

        if (active) {
          setBrief(data);
        }
      } catch (error) {
        console.error(error);

        if (active) {
          setBrief({
            ...initialBrief,
            summary: "Dynamic content could not be loaded."
          });
        }
      }
    }

    loadBrief();

    return () => {
      active = false;
    };
  }, []);

  return (
    <article className="panel live-panel">
      <p className="panel-label">Live refresh brief</p>
      <h2>{brief.label}</h2>
      <p className="panel-copy">{brief.summary}</p>

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
    </article>
  );
}
