import RefreshPanel from "./refresh-panel";

export default function HomePage() {
  return (
    <main className="shell">
      <div className="paw-stream" aria-hidden="true">
        <span>🐾</span>
        <span>🐾</span>
        <span>🐾</span>
        <span>🐾</span>
      </div>

      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">Animated Kitty B</p>
          <h1>Build fast with bouncy kitty energy.</h1>
          <p className="intro">
            Welcome to theme B: floating paws, playful gradients, animated kitties,
            and a control desk that feels fun while you ship production updates.
          </p>
        </div>

        <div className="kitty-card" aria-hidden="true">
          <img src="/kitty.gif" alt="" className="kitty" />
        </div>
      </section>

      <section className="grid">
        <RefreshPanel />

        <article className="panel playful-panel">
          <p className="panel-label">Kitty mission queue B</p>
          <ul className="action-list">
            <li>Catch visual bugs with zoomie-level speed</li>
            <li>Refresh stale sections with extra cat-titude</li>
            <li>Push polished changes with pawsitive confidence</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
