import type { ReactNode } from "react";

// Simple, original line icons (one per category slug). Decorative — they inherit
// stroke color via currentColor and sit inside the dashed "icon-circle".
const ICONS: Record<string, ReactNode> = {
  "weight-loss": (
    <>
      <polyline points="4 8 9 13 13 10 20 17" />
      <polyline points="20 13 20 17 16 17" />
    </>
  ),
  "dental-health": (
    <path d="M7 3.5c-2.2 0-3.6 1.7-3.6 4 0 1.6.5 2.9.9 4.4.5 1.8.6 3.4.9 5 .2 1.2.5 2.6 1.4 2.6 1 0 1.1-1.7 1.4-3 .2-1 .4-1.7.9-1.7s.7.7.9 1.7c.3 1.3.4 3 1.4 3 .9 0 1.2-1.4 1.4-2.6.3-1.6.4-3.2.9-5 .4-1.5.9-2.8.9-4.4 0-2.3-1.4-4-3.6-4-1 0-1.6.6-2.2.6S8 3.5 7 3.5z" />
  ),
  "blood-sugar": (
    <>
      <path d="M12 3.5s5.5 6 5.5 10.5a5.5 5.5 0 0 1-11 0C6.5 9.5 12 3.5 12 3.5z" />
      <polyline points="9.5 13.5 11 15 14.5 11.5" />
    </>
  ),
  "gut-health": (
    <>
      <path d="M12 21v-7" />
      <path d="M12 14c0-3 2.1-5.1 5.1-5.1C17.1 11.9 15 14 12 14z" />
      <path d="M12 16.5c0-2.1-1.5-3.6-3.6-3.6 0 2.1 1.5 3.6 3.6 3.6z" />
    </>
  ),
  prostate: (
    <>
      <circle cx="10" cy="14" r="5" />
      <line x1="13.6" y1="10.4" x2="19" y2="5" />
      <polyline points="15 5 19 5 19 9" />
    </>
  ),
  joints: (
    <>
      <circle cx="7" cy="17" r="2.6" />
      <circle cx="17" cy="7" r="2.6" />
      <line x1="8.9" y1="15.1" x2="15.1" y2="8.9" />
    </>
  ),
  hearing: (
    <>
      <path d="M5 12a7 7 0 0 1 7-7" />
      <path d="M8 12a4 4 0 0 1 4-4" />
      <circle cx="12" cy="12" r="1.3" />
    </>
  ),
  "pineal-gland": (
    <>
      <path d="M9.4 6.6a2.6 2.6 0 0 0-2 4.1 2.6 2.6 0 0 0 .6 4.8 2.6 2.6 0 0 0 4 .7 2.6 2.6 0 0 0 4-.7 2.6 2.6 0 0 0 .6-4.8 2.6 2.6 0 0 0-2-4.1 2.5 2.5 0 0 0-3.1-1 2.5 2.5 0 0 0-3.1 1z" />
      <line x1="12" y1="7" x2="12" y2="16.5" />
    </>
  ),
};

export default function CategoryIcon({ slug }: { slug: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[slug] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
