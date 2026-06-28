// Broad supplement categories shown on the homepage grid and at /category/<slug>.
// `name` must match the `category` field that scripts/build-products.js writes
// onto each product in products.ts. `slug` is always slugify(name).
export type Category = {
  slug: string;
  name: string;
  tags: string; // short "form factor" line under the card title
  blurb: string; // 1-sentence description (card + category-page intro)
  metaTitle: string;
  metaDescription: string;
};

export const categories: Category[] = [
  {
    slug: "weight-loss",
    name: "Weight Loss",
    tags: "capsules, supplements",
    blurb:
      "Support for metabolism, energy, and healthy weight management — from mitochondria-focused formulas to nighttime and gut-first approaches.",
    metaTitle: "Best Weight Loss Supplement Reviews",
    metaDescription:
      "Independent US reviews of popular weight loss supplements — ingredients, pricing, guarantees, side effects, and where to buy.",
  },
  {
    slug: "dental-health",
    name: "Dental Health",
    tags: "tablets, probiotics, supplements",
    blurb:
      "Formulas for healthy gums, stronger teeth, fresher breath, and a balanced oral microbiome.",
    metaTitle: "Best Dental Health Supplement Reviews",
    metaDescription:
      "Independent US reviews of popular dental and oral health supplements — ingredients, pricing, guarantees, and where to buy.",
  },
  {
    slug: "blood-sugar",
    name: "Blood Sugar",
    tags: "drops, capsules, supplements",
    blurb:
      "Support for healthy blood sugar, steady energy, and glucose metabolism.",
    metaTitle: "Best Blood Sugar Supplement Reviews",
    metaDescription:
      "Independent US reviews of popular blood sugar support supplements — ingredients, pricing, guarantees, and where to buy.",
  },
  {
    slug: "gut-health",
    name: "Gut Health",
    tags: "capsules, supplements",
    blurb:
      "Digestive comfort, less bloating, and a balanced gut from targeted botanicals and probiotics.",
    metaTitle: "Best Gut Health Supplement Reviews",
    metaDescription:
      "Independent US reviews of popular gut health and digestion supplements — ingredients, pricing, guarantees, and where to buy.",
  },
  {
    slug: "prostate",
    name: "Prostate",
    tags: "powder, supplements",
    blurb:
      "Support for prostate health, urinary comfort, and healthy circulation for men.",
    metaTitle: "Best Prostate Supplement Reviews",
    metaDescription:
      "Independent US reviews of popular prostate and men's health supplements — ingredients, pricing, guarantees, and where to buy.",
  },
  {
    slug: "joints",
    name: "Joints",
    tags: "capsules, supplements",
    blurb:
      "Support for synovial fluid, flexible joints, and comfortable everyday movement.",
    metaTitle: "Best Joint Support Supplement Reviews",
    metaDescription:
      "Independent US reviews of popular joint support supplements — ingredients, pricing, guarantees, and where to buy.",
  },
  {
    slug: "hearing",
    name: "Hearing",
    tags: "drops, supplements",
    blurb:
      "Support for healthy hearing and mental clarity from natural liquid formulas.",
    metaTitle: "Best Hearing Support Supplement Reviews",
    metaDescription:
      "Independent US reviews of popular hearing support supplements — ingredients, pricing, guarantees, and where to buy.",
  },
  {
    slug: "pineal-gland",
    name: "Pineal Gland",
    tags: "capsules, supplements",
    blurb:
      "Plant-based, stimulant-free support for pineal gland function and overall vitality.",
    metaTitle: "Best Pineal Gland Supplement Reviews",
    metaDescription:
      "Independent US reviews of popular pineal gland supplements — ingredients, pricing, guarantees, and where to buy.",
  },
];

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryByName(name: string): Category | undefined {
  return categories.find((c) => c.name === name);
}
