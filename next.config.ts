import type { NextConfig } from "next";

// Legacy /reviews/<slug> URLs -> new category-based slugs at the site root.
// Permanent (308) redirects so previously indexed/bookmarked review URLs keep
// resolving. Mirrors the category descriptors in scripts/build-products.js.
const legacyReviewRedirects: Record<string, string> = {
  mitolyn: "mitolyn-weight-loss-supplement",
  prodentim: "prodentim-oral-health-supplement",
  sleeplean: "sleeplean-sleep-weight-loss-supplement",
  "belly-flush": "belly-flush-gut-health-supplement",
  provadent: "provadent-oral-health-supplement",
  dentolyn: "dentolyn-oral-health-supplement",
  dentalprime: "dentalprime-oral-health-supplement",
  "pineal-xt": "pineal-xt-wellness-supplement",
  prostavive: "prostavive-prostate-supplement",
  "joint-genesis": "joint-genesis-joint-health-supplement",
  "sugar-defender": "sugar-defender-blood-sugar-supplement",
  zencortex: "zencortex-hearing-health-supplement",
  biome: "biome-weight-loss-supplement",
  glucoberry: "glucoberry-blood-sugar-supplement",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(legacyReviewRedirects).map(([oldSlug, newSlug]) => ({
      source: `/reviews/${oldSlug}`,
      destination: `/${newSlug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
