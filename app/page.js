import RefreshPanel from "./refresh-panel";

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Autonomous Coding Agent</p>
        <h1>Ship front-end updates from a small Vercel-ready control surface.</h1>
        <p className="intro">
          This Next.js app is a simple website shell for configuring an autonomous
          coding agent that can update code, review changes, and push production
          releases.
        </p>
      </section>

      <section className="grid">
        <RefreshPanel />

        <article className="panel">
          <p className="panel-label">Agent actions</p>
          <ul className="action-list">
            <li>Update front-end copy and layout</li>
            <li>Apply code fixes to the website</li>
            <li>Prepare a production-ready push to Vercel</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
