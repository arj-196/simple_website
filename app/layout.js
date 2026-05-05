import "./globals.css";

export const metadata = {
  title: "Agent Launchpad - 907c9a8",
  description: "A simple Next.js control surface for an autonomous coding agent."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
