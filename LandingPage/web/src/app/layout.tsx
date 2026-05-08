import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexora Labs | Full-Service Web Agency",
  description: "We help small businesses and local brands get online with a complete web presence: strategy, design, and development, done for them fast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
