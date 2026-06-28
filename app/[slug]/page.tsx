import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getProductBySlug } from "../lib/products";
import JsonLd from "../components/json-ld";
import { productReviewGraph } from "../lib/schema";
import { SITE_NAME, LOCALE } from "../lib/site";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Review Not Found" };
  }

  const canonical = `/${product.slug}`;
  const images = [{ url: product.main_image_url, alt: product.image_alt_text }];

  return {
    title: product.seo_title,
    description: product.meta_description,
    keywords: product.keywords,
    alternates: { canonical },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      locale: LOCALE,
      url: canonical,
      title: product.seo_title,
      description: product.meta_description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: product.seo_title,
      description: product.meta_description,
      images: [product.main_image_url],
    },
  };
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <article className="article-wrap">
      <JsonLd data={productReviewGraph(product)} />
      <nav className="breadcrumb">
        <Link href="/">Home</Link> &rsaquo;{" "}
        <Link href="/#reviews">Reviews</Link> &rsaquo; {product.product_name}
      </nav>

      <div className="article-hero-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.main_image_url} alt={product.image_alt_text} />
      </div>

      <div
        className="article"
        dangerouslySetInnerHTML={{
          __html: product.html_content.replace(/<img[^>]*>/gi, ""),
        }}
      />
    </article>
  );
}
