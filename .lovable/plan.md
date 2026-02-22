
# Add Dark/Light Mode Toggle Preview Animation to Hero

## Verification Summary
All landing page sections were verified on both desktop (1920px) and mobile (390px):
- Navbar: renders correctly with logo, nav links, theme toggle, and wallet button (hamburger menu on mobile with bottom tab bar)
- Hero: heading, subtitle, stats, CTAs, and stream visualization all display properly
- Social Proof Strip: trust badges render inline on desktop, wrap on mobile
- Features ("Why DRIP?"): 3-column grid on desktop, stacked on mobile, hover effects working
- How It Works: 4-step cards with dashed connector line on desktop
- Use Cases: collapsible cards working
- FAQ: accordion expand/collapse working
- CTA: styled card with Launch App button
- Footer: multi-column layout on desktop, stacked on mobile with all links visible
- Smooth scrolling: "Learn More" button smoothly scrolls to features section

No issues found.

---

## Theme Toggle Preview Animation

### Overview
Add an animated mini-preview below the stream visualization in the hero section that automatically toggles between dark and light mode appearances every few seconds, showcasing the theme system without actually changing the page theme.

### New Component: `src/components/ThemePreview.tsx`
- A self-contained component that renders a small mock "app card" (like a miniature dashboard card)
- Uses internal state to cycle between dark and light appearances every 3 seconds
- The card transitions smoothly between light and dark color schemes using inline styles (not the actual theme system)
- Includes a small Sun/Moon icon indicator that rotates during transitions
- Layout: a compact rounded card (~300px wide) with:
  - A mini header bar (mock nav with dot indicators)
  - A mock stream progress bar
  - A small "0.42 sBTC" label
- Uses Framer Motion `AnimatePresence` and `animate` for smooth color/opacity transitions
- Below the card: a subtle label like "Supports dark and light themes"

### Integration: `src/pages/Index.tsx`
- Import `ThemePreview` and place it after the `StreamVisualization` in the hero section
- Wrap in a `motion.div` with delay 0.6 for staggered entrance
- Centered, responsive layout

### Technical Details

| Area | Detail |
|------|--------|
| New file | `src/components/ThemePreview.tsx` |
| Modified file | `src/pages/Index.tsx` |
| Animation | Framer Motion `animate` with color transitions on a 3-second interval |
| Dependencies | None new (Framer Motion + Lucide already installed) |
| Theme isolation | Uses inline styles for the preview colors, does not affect the actual page theme |
| Responsive | Max-width 300px, centered, scales down on mobile |
