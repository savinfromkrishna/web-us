// Renders a JSON-LD structured-data block. `<` is escaped to its unicode
// equivalent to prevent XSS via stringified content (per Next.js guidance).
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
