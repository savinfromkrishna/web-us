// Builders for schema.org JSON-LD structured data. Rich, accurate structured
// data is the single biggest lever for both classic SEO rich results and
// Generative Engine Optimization (LLM answer engines extract facts from it).
//
// Note: we deliberately omit reviewRating / aggregateRating because we do not
// collect real numeric ratings. Inventing them violates Google's review-snippet
// policy and misleads users.
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  LOCALE_BCP47,
  COUNTRY,
  US_STATES,
} from "./site";
import type { Product } from "./products";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    // This publisher serves readers across the entire United States.
    areaServed: [
      { "@type": "Country", name: COUNTRY },
      ...US_STATES.map((name) => ({ "@type": "State", name })),
    ],
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: LOCALE_BCP47,
    publisher: { "@id": ORG_ID },
  };
}

// Site-wide graph rendered once in the root layout (Organization + WebSite).
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode()],
  };
}

// Homepage: a CollectionPage that lists every review (helps engines and LLMs
// understand the site is a hub of N supplement reviews).
export function reviewsCollectionGraph(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: `${SITE_NAME} — ${SITE_DESCRIPTION}`,
    inLanguage: LOCALE_BCP47,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/${p.slug}`,
        name: `${p.product_name} Review`,
      })),
    },
  };
}

// Product review page: BreadcrumbList + Product + Review + (optional) FAQPage.
export function productReviewGraph(product: Product) {
  const url = `${SITE_URL}/${product.slug}`;
  const productId = `${url}/#product`;

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Reviews",
        item: `${SITE_URL}/#reviews`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${product.product_name} Review`,
        item: url,
      },
    ],
  };

  const productNode = {
    "@type": "Product",
    "@id": productId,
    name: product.product_name,
    image: product.main_image_url,
    description: product.meta_description,
    category: product.category,
    brand: { "@type": "Brand", name: product.product_name },
  };

  const review = {
    "@type": "Review",
    "@id": `${url}/#review`,
    url,
    name: product.seo_title,
    headline: product.seo_title,
    reviewBody: product.meta_description,
    inLanguage: LOCALE_BCP47,
    itemReviewed: { "@id": productId },
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: url,
  };

  const graph: object[] = [breadcrumb, productNode, review];

  if (product.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}/#faq`,
      mainEntity: product.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
