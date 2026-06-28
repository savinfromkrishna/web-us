import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "../../lib/products";
import {
  categories,
  getAllCategorySlugs,
  getCategoryBySlug,
} from "../../lib/categories";
import JsonLd from "../../components/json-ld";
import { categoryPageGraph } from "../../lib/schema";

export function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  const canonical = `/category/${category.slug}`;

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: category.metaTitle,
      description: category.metaDescription,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const items = products.filter((p) => p.category === category.name);

  return (
    <div className="category-page">
      <JsonLd data={categoryPageGraph(category, items)} />
      <nav className="breadcrumb">
        <Link href="/">Home</Link> &rsaquo; {category.name}
      </nav>

      <header className="category-hero">
        <h1>{category.name} Supplements</h1>
        <p>{category.blurb}</p>
      </header>

      <div className="review-grid">
        {items.map((product) => (
          <Link
            key={product.slug}
            href={`/${product.slug}`}
            className="review-card"
          >
            <div className="thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.main_image_url} alt={product.image_alt_text} />
            </div>
            <div className="body">
              <h2 className="card-title">{product.product_name} Review</h2>
              <p>{product.tagline}</p>
              <span className="read">Read full review &rarr;</span>
            </div>
          </Link>
        ))}
      </div>

      <nav className="category-nav" aria-label="Other categories">
        <h2>Other categories</h2>
        <ul>
          {categories
            .filter((c) => c.slug !== category.slug)
            .map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}
