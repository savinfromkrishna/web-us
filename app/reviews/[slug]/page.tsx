import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getProductBySlug } from "../../lib/products";

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

  return {
    title: product.seo_title,
    description: product.meta_description,
    keywords: product.keywords,
    alternates: { canonical: `/reviews/${product.slug}` },
    openGraph: {
      title: product.seo_title,
      description: product.meta_description,
      images: [{ url: product.main_image_url, alt: product.image_alt_text }],
      type: "article",
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
