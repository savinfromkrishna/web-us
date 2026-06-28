import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";
import { products } from "./lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  // Evaluated at build time (no request-time API), so all entries share a
  // stable lastModified that updates whenever the site is rebuilt.
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...products.map((product) => ({
      url: `${SITE_URL}/${product.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [product.main_image_url],
    })),
  ];
}
