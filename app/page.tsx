import type { Metadata } from "next";
import Link from "next/link";
import { products } from "./lib/products";
import JsonLd from "./components/json-ld";
import { reviewsCollectionGraph } from "./lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={reviewsCollectionGraph(products)} />
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
        All Reviews
      </h2>

      <div className="review-grid">
        {products.map((product) => (
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
              <span className="cat">{product.category}</span>
              <h3>{product.product_name} Review</h3>
              <p>{product.tagline}</p>
              <span className="read">Read full review &rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
