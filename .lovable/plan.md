

# DRIP Protocol Frontend — Implementation Plan

## Overview
DRIP is a premium sBTC streaming payments protocol on Stacks. The frontend enables users to create, monitor, withdraw from, and cancel real-time Bitcoin payment streams. The design blends Bitcoin's warm amber/gold palette with water/flow-inspired blue accents for a sophisticated, enterprise-grade experience.

> **Note:** The PRD recommends Next.js, but since Lovable uses React + Vite, we'll adapt the architecture accordingly using React Router for routing. All other tech (Tailwind, shadcn/ui, TanStack Query, React Hook Form + Zod) is already in the project.

---

## Phase 1: Foundation

### 1.1 — Design System & Theming
- Replace the default shadcn color scheme with DRIP's custom palette: primary amber/orange tones, accent water/blue tones, and neutral zinc scale
- Add gradients (primary, flow, gold, glass, background) as CSS custom properties
- Configure Inter as the primary font, JetBrains Mono for monospace (addresses, amounts), and Cal Sans for display headings
- Set up custom shadow tokens (including colored shadows and glow effects)
- Add animation tokens (durations, easing curves) and keyframe animations (streamFlow, shimmer, waterDrop, ripple, pageEnter)

### 1.2 — Layout & Navigation
- Build a top navigation bar with the DRIP logo/wordmark, nav links (Dashboard, Create, History), and a wallet connection button on the right
- Mobile: bottom tab bar with hamburger menu
- Create a reusable `DashboardLayout` wrapper with the nav and a content area
- Add page transition animations (fade + slide up)

### 1.3 — Routing Structure
- `/` — Landing page
- `/dashboard` — Main dashboard
- `/create` — Create stream (multi-step form)
- `/stream/:id` — Stream detail page
- `/settings` — Settings page (future)

### 1.4 — Wallet Connection (UI Only)
- Build a `WalletButton` component that shows "Connect Wallet" when disconnected and a truncated address + balance when connected
- Create a wallet connection modal with wallet type selection (Leather, Xverse)
- For Phase 1, use mock/simulated wallet state — actual `@stacks/connect` integration comes in Phase 2

---

## Phase 2: Core Features

### 2.1 — Dashboard Page
- **Stats Cards Row**: Three cards showing Total Streaming (sBTC locked in outgoing), Total Received (lifetime incoming), and Active Streams (count with in/out breakdown)
- **Outgoing Streams Section**: List of stream cards the user is sending, with a "+ Create" button
- **Incoming Streams Section**: List of stream cards the user is receiving
- Greeting banner ("Good morning, Builder 👋")
- Empty states for when there are no streams yet

### 2.2 — Stream Card Component
- Shows stream direction icon, recipient/sender address (truncated), status badge (Active/Completed/Cancelled)
- Animated progress bar with shimmer effect for active streams
- Displays vested amount, remaining amount, and time left
- Action buttons: "View Details" and contextual "Cancel" (for outgoing) or "Withdraw" (for incoming)
- Hover state: card lifts with shadow

### 2.3 — Create Stream Form (Multi-Step)
- **Step 1 — Recipient**: Address input with validation, paste button, recent recipients list
- **Step 2 — Amount**: sBTC amount input with USD conversion display, available balance, quick-select buttons (25%, 50%, 75%, MAX)
- **Step 3 — Duration**: Duration input with block height conversion, quick-select presets (7d, 14d, 30d, 90d, 1yr), calculated streaming rate display
- **Step 4 — Review**: Full summary of all parameters (from, to, amount, duration, rate, start/end dates, network fee), "Create Stream" CTA with escrow disclosure
- Step indicator/progress bar at top
- Back/Continue navigation between steps
- Form validation with Zod at each step

### 2.4 — Stream Detail Page
- **Stream Visualization**: Animated sender-to-recipient flow with particles showing Bitcoin flowing
- **Progress Bar**: Large progress bar with percentage and shimmer animation
- **Stream Details Card**: Status, sender, recipient, total amount, duration, start/end dates
- **Quick Stats Card**: Vested, withdrawn, withdrawable, remaining amounts, time left, daily rate
- **Actions Panel**: Withdraw button (for recipient, showing withdrawable amount) and Cancel button (for sender), with confirmation modals
- **Transaction History**: List of on-chain events (created, withdrawals) with explorer links
- Back to Dashboard link

### 2.5 — Smart Contract Integration
- Install `@stacks/connect`, `@stacks/transactions`, `@stacks/network`
- Create contract config (testnet addresses for `drip-core` and `sbtc-token`)
- Implement read functions: `getUserStreams`, `getStreamDetails`, `getGlobalStats`, `getVested`, `getWithdrawable`
- Implement write functions: `createStream`, `withdraw`, `cancelStream` with proper post-conditions
- Build custom hooks: `useStreams`, `useStreamDetails`, `useWallet`, `useTransaction`
- Set up polling for real-time stream updates (every 10 seconds)
- Transaction status tracking with Hiro API

---

## Phase 3: Polish & UX

### 3.1 — Animations & Micro-interactions
- Stream flow particle animation on active streams
- Number counting/ticking animation for live amounts
- Button hover lift effects and loading states
- Card hover elevation transitions
- Water drop animation on the landing page hero
- Skeleton loading states for all data-driven components

### 3.2 — Landing Page
- **Hero Section**: "Bitcoin that flows." headline with animated water drop illustration, live protocol stats (total streamed, active streams), and dual CTAs (Launch App / Learn More)
- **Features Section**: 6-card grid (Real-Time Payments, Trustless Escrow, Instant Access, Linear Vesting, Cancel Anytime, Full Transparency)
- **How It Works**: 4-step visual flow (Create → Lock → Stream → Withdraw)
- **Use Cases**: Expandable cards for Payroll, Token Vesting, Creator Economy, DAO Treasury
- **CTA Section**: Final call-to-action to launch the app

### 3.3 — Error Handling
- Map smart contract error codes (u100–u108) to user-friendly messages and recovery actions
- Inline form validation errors
- Toast notifications for transaction success/failure with retry actions
- Full-page error states (stream not found, network error)
- Network error handling wrapper with timeout/connection detection

### 3.4 — Responsive Design
- Mobile-first layouts for all pages
- Dashboard: stacked stats + tabbed streams on mobile, side-by-side on tablet/desktop
- Create form: full-width on mobile, centered card on desktop
- Stream detail: stacked sections on mobile, grid on desktop
- Bottom tab navigation on mobile

### 3.5 — Accessibility
- WCAG 2.1 AA color contrast compliance
- Full keyboard navigation with visible focus rings (primary-500 outline)
- ARIA labels on stream cards, progress bars, and live regions
- `prefers-reduced-motion` support — disable particle animations and reduce transitions
- Minimum 44×44px touch targets

---

## Phase 4: Launch Ready

### 4.1 — Performance
- Lazy-load routes with React.lazy and Suspense
- Font loading optimization (font-display: swap, subsetting)
- Target: FCP < 1.5s, LCP < 2.5s, CLS < 0.1

### 4.2 — Final Touches
- Settings page (wallet management, notification preferences)
- History page with filterable completed/cancelled streams
- Cross-browser testing
- Dark mode support (tokens already spec'd in PRD)

---

## Implementation Order (Recommended)
We'll build iteratively, starting with Phase 1 (design system + layout + routing + wallet UI), then Phase 2 (dashboard + stream cards + create form + detail page + contract integration), then layering on Phase 3 polish and Phase 4 optimizations. Each phase produces a usable, testable increment.

