import "./globals.css";

export const metadata = {
  title: "Animated Kitty Launchpad",
  description: "A playful Next.js control surface for an autonomous coding agent."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
