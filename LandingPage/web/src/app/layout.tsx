import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Onest } from "next/font/google";
import "./globals.css";

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

const bodyFont = Onest({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-onest",
});

const siteUrl = new URL("https://nexoralabs.com");
const siteDescription =
  "Nexora Labs turns local trust, proof, and service offers into custom websites that help owner-led businesses earn better enquiries and bookings.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "Nexora Labs",
  title: {
    default: "Nexora Labs | Market-Fit Websites For Service Brands",
    template: "%s | Nexora Labs",
  },
  description: siteDescription,
  keywords: [
    "Nexora Labs",
    "service business websites",
    "custom website design",
    "landing page strategy",
    "local business web agency",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Nexora Labs",
    title: "Nexora Labs | Market-Fit Websites For Service Brands",
    description: siteDescription,
    images: [
      {
        url: "/services-background.png",
        width: 1672,
        height: 941,
        alt: "Nexora Labs studio table for market-fit website planning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora Labs | Market-Fit Websites For Service Brands",
    description: siteDescription,
    images: ["/services-background.png"],
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2e5c7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
