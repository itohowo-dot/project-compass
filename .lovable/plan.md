
# Landing Page Enhancements

## Overview
Five improvements to make the landing page more complete, polished, and navigable: add the Navbar, smooth scrolling, an FAQ section, a stream visualization in the hero, and a proper multi-column footer.

---

## 1. Add Navbar to the Landing Page

**File: `src/components/AnimatedRoutes.tsx`**
- Import `Navbar` and render it above the `Routes` for the `/` route
- Since other pages (Dashboard, Create, History) already use `DashboardLayout` which includes its own Navbar, we only need to conditionally show it on the Index route
- Approach: wrap the Index route's element with `<><Navbar /><Index /></>` inside the `PageTransition`

**File: `src/pages/Index.tsx`**
- Remove the duplicate DRIP logo/branding from the hero section (the logo + "DRIP" text block at the top) since the Navbar already shows it
- Keep the hero heading, subtitle, stats, and CTAs

---

## 2. Smooth Scrolling

**File: `src/index.css`**
- Add `scroll-behavior: smooth` to the `html` element in the base layer

**File: `src/pages/Index.tsx`**
- The "Learn More" button already uses `href="#features"` -- smooth scrolling via CSS will handle this automatically
- Add `id` attributes to other sections (e.g., `id="faq"`) for any future in-page links

---

## 3. Animated Stream Visualization in Hero

**File: `src/components/StreamVisualization.tsx`** (new file)
- A self-contained animated mock showing sBTC flowing from sender to recipient
- Layout: two "wallet" boxes (Sender / Recipient) connected by a horizontal bar
- Animated dots/particles flow left-to-right along the bar using Framer Motion
- Below the bar: a small progress label like "0.42 / 1.00 sBTC streamed" that counts up
- Styled with the existing DRIP design tokens (gradient-primary, border-border/50, bg-card/50)
- Fully responsive: horizontal on desktop, slightly smaller on mobile

**File: `src/pages/Index.tsx`**
- Import and place `StreamVisualization` below the CTA buttons in the hero, inside the staggered animation sequence (delay 0.5)

---

## 4. FAQ Section

**File: `src/pages/Index.tsx`**
- Add an FAQ section between the Use Cases section and the CTA section
- Use the existing `Accordion` component (`src/components/ui/accordion.tsx`) for expand/collapse
- Section heading: "Frequently Asked Questions"
- Questions:

| Question | Answer |
|----------|--------|
| What is sBTC? | sBTC is a decentralized Bitcoin peg on the Stacks blockchain that lets you use BTC in smart contracts while maintaining Bitcoin's security. |
| How does DRIP streaming work? | You lock sBTC in a smart contract specifying a recipient and duration. The contract vests funds linearly -- the recipient can withdraw their earned portion at any time. |
| Are there any fees? | DRIP charges no protocol fees. You only pay standard Stacks network transaction fees for creating, withdrawing from, or cancelling a stream. |
| Is it secure? | DRIP uses audited Clarity smart contracts on Stacks. Funds are held in a non-custodial escrow -- neither DRIP nor any third party can access your sBTC. |
| Can I cancel a stream? | Yes. The sender can cancel an active stream at any time. Vested funds go to the recipient, and unvested funds are returned to the sender. |
| What wallets are supported? | DRIP works with any Stacks-compatible wallet, including Leather (formerly Hiro Wallet) and Xverse. |

- Motion entrance animation consistent with other sections

---

## 5. Improved Footer

**File: `src/pages/Index.tsx`**
- Replace the simple single-row footer with a multi-column layout
- Structure:

```text
+------------------+-------------+-------------+----------+
| DRIP Protocol    | Product     | Community   | Legal    |
| Brief tagline    | Dashboard   | Twitter     | Terms    |
| about streaming  | Create      | Discord     | Privacy  |
| Bitcoin payments | History     | GitHub      |          |
|                  | Docs        |             |          |
+------------------+-------------+-------------+----------+
| (c) 2026 DRIP Protocol. Built on Stacks. Powered by Bitcoin. |
+--------------------------------------------------------------+
```

- On mobile: 2x2 grid for the link columns, full-width for the branding section
- All links are `href="#"` placeholders but organized meaningfully
- Bottom bar with copyright and tagline

---

## Technical Details

| Area | Detail |
|------|--------|
| New file | `src/components/StreamVisualization.tsx` |
| Modified files | `src/pages/Index.tsx`, `src/components/AnimatedRoutes.tsx`, `src/index.css` |
| Dependencies | None new -- uses existing Framer Motion, Accordion, Lucide icons |
| Smooth scrolling | CSS `scroll-behavior: smooth` on `html` |
| FAQ component | Radix Accordion (already installed) |
| Stream viz | Framer Motion `animate` with repeating particle animations |
| Navbar on landing | Rendered conditionally in `AnimatedRoutes.tsx` for the `/` route only |
