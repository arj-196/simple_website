const briefs = [
  {
    label: "Deploy window open",
    summary: "Agent is cleared to ship a front-end refinement.",
    focus: "Landing page polish"
  },
  {
    label: "Code review mode",
    summary: "Agent is scanning for regressions before publishing.",
    focus: "UI stability checks"
  },
  {
    label: "Fast patch ready",
    summary: "Agent can apply a targeted fix and promote it.",
    focus: "Production hotfix"
  },
  {
    label: "Iteration cycle active",
    summary: "Agent is free to rewrite copy and push the next version.",
    focus: "Content refresh"
  },
  {
    label: "Experiment queued",
    summary: "Agent is preparing a new visual tweak for release.",
    focus: "Hero section variant"
  }
];

const signals = [
  "CI green",
  "Diff validated",
  "Push authorized",
  "Preview synced",
  "Checks pending"
];

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export async function GET() {
  const brief = randomItem(briefs);

  return Response.json(
    {
      timestamp: new Date().toISOString(),
      label: brief.label,
      summary: brief.summary,
      focus: brief.focus,
      signal: randomItem(signals),
      runId: Math.floor(1000 + Math.random() * 9000)
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0"
      }
    }
  );
}
