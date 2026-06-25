---
name: Sub-page template
description: PremiumInfoPage.tsx shared template for all info/content sub-pages.
---

Located at: `artifacts/tagore-school/src/components/PremiumInfoPage.tsx`

Props: title, subtitle, badge, badgeEmoji, breadcrumb, sections[], ctaText, ctaLink

Section types:
- `"text"` — renders paragraphs
- `"list"` — renders bulleted list with gold dots in a blue-tinted box
- `"cards"` — renders a 3-col card grid with hover effects
- `"table"` — renders alternating-row table with blue labels

All sub-pages import this and pass content as props. The hero has a Royal Blue gradient, wave SVG divider, and gold badge pill.

**Why:** 20+ sub-pages needed; a shared template ensures visual consistency and fast creation.

**How to apply:** For new info pages, import PremiumInfoPage and pass sections array. For custom pages (login, success stories), create standalone files.
