

# Enhanced Landing Page

## Overview
Upgrade the landing page with richer scroll animations, improved mobile layout, a new "Trusted By" / social proof section, and a more immersive hero. All changes are in a single file: `src/pages/Index.tsx`.

## Changes

### 1. Hero Section -- Mobile-First Improvements
- Reduce vertical padding on mobile (`py-16 md:py-28 lg:py-36` instead of `py-24 md:py-36`)
- Scale heading down for small screens: `text-3xl sm:text-4xl md:text-6xl lg:text-7xl`
- Stack stats vertically on very narrow screens with `grid grid-cols-3` and smaller text
- Make CTA buttons full-width on mobile (`w-full sm:w-auto`)
- Add staggered entrance animations to the logo, heading, subtitle, stats, and buttons (each fading in sequentially using framer-motion `transition.delay`)

### 2. Richer Scroll Animations Throughout
- **Features grid**: Cards animate in from alternating directions -- odd cards slide from left (`x: -30`), even cards from right (`x: 30`), creating a staggered zigzag effect instead of uniform `y: 20`
- **How It Works steps**: Each card scales up from `scale: 0.9` + fades in, with increasing delays, giving a "building blocks" feel
- **Use Cases**: Cards slide up with a slight rotation (`rotate: 2deg`) that straightens on enter
- **CTA section**: Scales up from `scale: 0.95` with a glow pulse animation on enter
- Add `whileInView` with `viewport={{ once: true, margin: "-50px" }}` so animations trigger slightly before elements are fully in view (feels snappier)

### 3. New "Social Proof" Strip (between Hero and Features)
- A horizontal strip with 3-4 trust signals: "Built on Stacks", "100% On-Chain", "Open Source", "Non-Custodial"
- Simple pill/badge layout with icons, subtle border, fades in on scroll
- Responsive: wraps naturally on mobile

### 4. Enhanced Feature Cards
- Add a subtle hover scale transform (`group-hover:scale-105` on the icon container)
- Add a faint gradient line at the top of each card on hover (using a pseudo-element via a small `before:` utility or a div)

### 5. "How It Works" -- Connector Line
- Add a horizontal dashed connector line between steps on desktop (`lg:`) using a positioned border element, replacing the simple arrow icon
- On mobile, steps stack vertically with a vertical dashed line on the left side

### 6. Footer Enhancement
- Add a row of links: "Docs", "GitHub", "Twitter" (as placeholder `#` hrefs)
- Keep it minimal, single row on mobile

## Technical Details

| Area | Technique |
|------|-----------|
| Staggered hero entrance | framer-motion `transition: { delay: 0.1 * index }` on child divs |
| Zigzag feature cards | `initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}` |
| Scale-in steps | `initial={{ opacity: 0, scale: 0.9 }}` with `whileInView` |
| Social proof strip | New `const TRUST_BADGES` array + mapped badges with `motion.div` |
| Connector lines | CSS `border-dashed` + absolute positioning between step cards |
| Mobile responsiveness | Tailwind responsive prefixes throughout (`text-3xl sm:text-4xl`, `w-full sm:w-auto`, `py-16 md:py-28`) |

All changes stay in `src/pages/Index.tsx` and `src/index.css` (if any new utility classes are needed for the connector line). No new dependencies required -- everything uses existing framer-motion and Tailwind.

