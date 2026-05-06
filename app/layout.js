import "./globals.css";

export const metadata = {
  title: "Animated Kitty B",
  description: "A playful Animated Kitty B themed Next.js control deck."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
