import RefreshPanel from "./refresh-panel";

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">Animated Kitty Control Deck</p>
          <h1>Ship updates with pawsitive energy.</h1>
          <p className="intro">
            The autonomous coding agent is now running in kitty mode: playful visuals,
            quick status pings, and a launchpad built for fast front-end wins.
          </p>
        </div>

        <div className="kitty-card" aria-hidden="true">
          <img src="/kitty.gif" alt="" className="kitty" />
        </div>
      </section>

      <section className="grid">
        <RefreshPanel />

        <article className="panel playful-panel">
          <p className="panel-label">Kitty mission queue</p>
          <ul className="action-list">
            <li>Chase layout bugs until they disappear</li>
            <li>Pounce on stale copy and refresh it</li>
            <li>Nudge polished changes toward production</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
