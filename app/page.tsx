import type { Metadata } from "next";
import Link from "next/link";
import { products } from "./lib/products";
import { categories } from "./lib/categories";
import JsonLd from "./components/json-ld";
import CategoryIcon from "./components/category-icon";
import { categoriesCollectionGraph } from "./lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  // Count products per category so each card can show how many reviews it holds.
  const counts = new Map<string, number>();
  for (const product of products) {
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
  }

  return (
    <>
      <JsonLd data={categoriesCollectionGraph(categories)} />
      <section className="home-hero">
        <h1>Honest Reviews of Today&apos;s Most Popular Supplements</h1>
        <p>
          We dig into the ingredients, pricing, guarantees, and real-world
          results so you can decide what&apos;s actually worth your money — before
          you buy. Every supplement we review can be ordered online across all 50
          US states.
        </p>
      </section>

      <h2 className="section-title" id="reviews">
        Browse by Category
      </h2>
      <p className="section-subtitle">
        {categories.length} health categories · {products.length} independent
        reviews
      </p>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="category-card"
          >
            <span className="icon-circle">
              <CategoryIcon slug={category.slug} />
            </span>
            <h3>{category.name}</h3>
            <span className="tags">{category.tags}</span>
            <span className="count">
              {counts.get(category.name) ?? 0}{" "}
              {(counts.get(category.name) ?? 0) === 1 ? "review" : "reviews"}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
