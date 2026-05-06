const briefs = [
  {
    label: "Kitty sprint active",
    summary: "Animated Kitty B is cleared for a playful UI release.",
    focus: "Catwalk hero polish"
  },
  {
    label: "Purr review mode",
    summary: "Agent is scanning for regressions before the kitty parade.",
    focus: "Animation stability checks"
  },
  {
    label: "Zoomie patch ready",
    summary: "Agent can apply a targeted fix and ship with paw precision.",
    focus: "Playful production hotfix"
  },
  {
    label: "Pawprint iteration active",
    summary: "Agent is tuning copy and visuals for kitty-grade delight.",
    focus: "Theme B content refresh"
  },
  {
    label: "Whisker experiment queued",
    summary: "Agent is preparing a new animated tweak for release.",
    focus: "Hero bounce variant"
  }
];

const signals = [
  "Litter box clean",
  "Whiskers aligned",
  "Pawprint validated",
  "Catnip enabled",
  "Treats pending"
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
