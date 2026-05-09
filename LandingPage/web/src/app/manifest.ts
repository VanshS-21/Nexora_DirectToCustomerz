import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nexora Labs",
    short_name: "Nexora",
    description:
      "Market-fit websites for owner-led service brands with real-world trust.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f2e5c7",
    theme_color: "#d96d1a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
