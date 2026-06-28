// Assembles app/lib/raw/*.json review articles into app/lib/products.ts,
// enriching each with slug, category, and tagline; also extracts FAQ Q&A pairs
// and writes public/llms.txt for AI answer engines.
const fs = require("fs");
const path = require("path");

const rawDir = path.join(__dirname, "..", "app", "lib", "raw");
const outFile = path.join(__dirname, "..", "app", "lib", "products.ts");
const publicDir = path.join(__dirname, "..", "public");
const llmsFile = path.join(publicDir, "llms.txt");

// Domain for absolute URLs in llms.txt. Keep in sync with app/lib/site.ts.
const SITE_URL = "https://healthsupplements.best";
const SITE_NAME = "WellnessPicks";

// Metadata keyed by product_name (must match the article JSON exactly).
// `slug` is the canonical, frozen product URL (legacy /reviews/* URLs 308-redirect
// to it in next.config.ts) — do NOT regenerate it from the category.
// `category` is the BROAD bucket used by the homepage category grid and the
// /category/<slug> pages; keep it broad (e.g. every weight-related product lives
// under "Weight Loss"). Category display data lives in app/lib/categories.ts.
const meta = {
  Mitolyn: { slug: "mitolyn-weight-loss-supplement", category: "Weight Loss", tagline: "Mitochondria-focused support for metabolism, energy, and healthy weight management." },
  ProDentim: { slug: "prodentim-oral-health-supplement", category: "Dental Health", tagline: "An oral probiotic chewable that repopulates your mouth with friendly bacteria." },
  SleepLean: { slug: "sleeplean-sleep-weight-loss-supplement", category: "Weight Loss", tagline: "Deep-sleep support paired with nighttime weight management in one nightly capsule." },
  "Belly Flush": { slug: "belly-flush-gut-health-supplement", category: "Gut Health", tagline: "Eleven botanicals to ease bloating and support comfortable, regular digestion." },
  ProvaDent: { slug: "provadent-oral-health-supplement", category: "Dental Health", tagline: "A daily oral probiotic for fresher breath and a balanced oral microbiome." },
  Dentolyn: { slug: "dentolyn-oral-health-supplement", category: "Dental Health", tagline: "Nutrient-driven support for stronger gums, cleaner teeth, and fresh breath." },
  DentalPrime: { slug: "dentalprime-oral-health-supplement", category: "Dental Health", tagline: "Enamel-friendly minerals and biome support in a simple once-daily tablet." },
  "Pineal XT": { slug: "pineal-xt-wellness-supplement", category: "Pineal Gland", tagline: "Plant-based, stimulant-free support for pineal gland function and vitality." },
  ProstaVive: { slug: "prostavive-prostate-supplement", category: "Prostate", tagline: "A circulation-focused powder for prostate health, urinary comfort, and vitality." },
  "Joint Genesis": { slug: "joint-genesis-joint-health-supplement", category: "Joints", tagline: "Patented Mobilee plus botanicals to support synovial fluid and flexible joints." },
  "Sugar Defender": { slug: "sugar-defender-blood-sugar-supplement", category: "Blood Sugar", tagline: "A 24-ingredient liquid formula to support healthy blood sugar and steady energy." },
  ZenCortex: { slug: "zencortex-hearing-health-supplement", category: "Hearing", tagline: "Natural liquid drops formulated to support healthy hearing and mental clarity." },
  Biome: { slug: "biome-weight-loss-supplement", category: "Weight Loss", tagline: "Nine lean-bacteria strains and green tea extract for gut-first weight support." },
  GlucoBerry: { slug: "glucoberry-blood-sugar-supplement", category: "Blood Sugar", tagline: "Maqui berry support for a healthy kidney 'Blood Sugar Drain' and glucose balance." },
};

const order = [
  "01-mitolyn", "02-prodentim", "03-sleeplean", "04-belly-flush", "05-provadent",
  "06-dentolyn", "07-dentalprime", "08-pineal-xt", "09-prostavive", "10-joint-genesis",
  "11-sugar-defender", "12-zencortex", "13-biome", "14-glucoberry",
];

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Strip HTML tags + collapse whitespace + decode the few entities present.
function stripTags(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&rsquo;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Pull the "Frequently Asked Questions" Q&A pairs out of an article's HTML so
// they can power FAQPage structured data. Articles use <h2>FAQ...</h2> followed
// by <h3>question</h3><p>answer</p> pairs (tag case varies between articles).
function extractFaqs(html) {
  const heading = /<h2[^>]*>\s*Frequently Asked Questions[\s\S]*?<\/h2>/i.exec(
    html
  );
  if (!heading) return [];
  const after = html.slice(heading.index + heading[0].length);
  const nextH2 = after.search(/<h2[^>]*>/i);
  let section = nextH2 === -1 ? after : after.slice(0, nextH2);
  // Defensive: if the FAQ block were ever the final section, drop any affiliate
  // buy-button anchors and the trailing disclaimer so they can't bleed into the
  // last answer (and into FAQPage structured data).
  section = section.replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, " ");
  const disclaimerIdx = section.search(/<p>\s*<em>\s*Disclaimer/i);
  if (disclaimerIdx !== -1) section = section.slice(0, disclaimerIdx);

  const faqs = [];
  const pairRe = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3[^>]*>|$)/gi;
  let match;
  while ((match = pairRe.exec(section)) !== null) {
    const question = stripTags(match[1]);
    const answer = stripTags(match[2]);
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

const products = [];
for (const name of order) {
  const file = path.join(rawDir, `${name}.json`);
  if (!fs.existsSync(file)) {
    console.warn(`skip missing ${name}`);
    continue;
  }
  const article = JSON.parse(fs.readFileSync(file, "utf8"));
  const m = meta[article.product_name];
  if (!m) throw new Error(`No meta for product_name: ${article.product_name}`);
  const faqs = extractFaqs(article.html_content);
  products.push({
    slug: m.slug,
    category: m.category,
    tagline: m.tagline,
    product_name: article.product_name,
    affiliate_link: article.affiliate_link,
    main_image_url: article.main_image_url,
    seo_title: article.seo_title,
    meta_description: article.meta_description,
    keywords: article.keywords,
    image_alt_text: article.image_alt_text,
    html_content: article.html_content,
    faqs,
  });
}

const banner =
  "// AUTO-GENERATED by scripts/build-products.js — do not edit by hand.\n" +
  "// Run `node scripts/build-products.js` after editing files in app/lib/raw/.\n\n";
const typeDef =
  "export type Product = {\n" +
  "  slug: string;\n" +
  "  category: string;\n" +
  "  tagline: string;\n" +
  "  product_name: string;\n" +
  "  affiliate_link: string;\n" +
  "  main_image_url: string;\n" +
  "  seo_title: string;\n" +
  "  meta_description: string;\n" +
  "  keywords: string[];\n" +
  "  image_alt_text: string;\n" +
  "  html_content: string;\n" +
  "  faqs: { question: string; answer: string }[];\n" +
  "};\n\n";
const body =
  "export const products: Product[] = " +
  JSON.stringify(products, null, 2) +
  ";\n\n";
const helpers =
  "export function getProductBySlug(slug: string): Product | undefined {\n" +
  "  return products.find((p) => p.slug === slug);\n" +
  "}\n\n" +
  "export function getAllSlugs(): string[] {\n" +
  "  return products.map((p) => p.slug);\n" +
  "}\n";

fs.writeFileSync(outFile, banner + typeDef + body + helpers);
console.log(`Wrote ${products.length} products to ${outFile}`);

// ----- Generate /llms.txt for generative-engine optimization (GEO) -----
// A concise, link-rich Markdown summary that LLM answer engines can ingest.
const categoryOrder = [];
for (const p of products) {
  if (!categoryOrder.includes(p.category)) categoryOrder.push(p.category);
}
const llms =
  `# ${SITE_NAME}\n\n` +
  "> Independent, in-depth reviews of popular US health and wellness " +
  "supplements — ingredients, benefits, pricing, money-back guarantees, side " +
  "effects, and where to buy. Written for readers across all 50 US states.\n\n" +
  `Homepage / review hub: ${SITE_URL}/\n\n` +
  `This site contains affiliate links. All ${products.length} reviews are grouped into ${categoryOrder.length} categories.\n\n` +
  "## Categories\n\n" +
  categoryOrder
    .map((c) => `- [${c}](${SITE_URL}/category/${slugify(c)})`)
    .join("\n") +
  "\n\n## Supplement Reviews\n\n" +
  products
    .map(
      (p) =>
        `- [${p.product_name} Review](${SITE_URL}/${p.slug}) — ${p.category}. ${p.tagline}`
    )
    .join("\n") +
  "\n";

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(llmsFile, llms);
console.log(`Wrote llms.txt with ${products.length} entries to ${llmsFile}`);
