// Central site configuration. Keep SITE_URL in sync with the domain used in
// scripts/build-products.js (which writes public/llms.txt).
export const SITE_URL = "https://healthsupplements.best";
export const SITE_NAME = "WellnessPicks";
export const SITE_TAGLINE = "Honest Supplement Reviews";
export const SITE_DESCRIPTION =
  "Honest US reviews of popular health and wellness supplements — ingredients, pricing, guarantees, side effects, and where to buy, for readers in all 50 states.";

// Locale: this site exclusively targets the United States.
export const LOCALE = "en_US"; // Open Graph format
export const LOCALE_BCP47 = "en-US"; // <html lang> / hreflang format
export const COUNTRY = "United States";

// Every US state + DC, used for areaServed geo-targeting in structured data.
export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
] as const;
