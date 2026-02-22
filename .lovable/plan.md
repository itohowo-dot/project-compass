

# Phase 3: Polish, Animations, and History Page

This plan covers four workstreams: landing page enhancements, skeleton loading states, number counting animations, and the History page with filters.

---

## Overview of Current State

All Phase 2 core features are working:
- Landing page has hero, features grid, how-it-works, and CTA sections with Framer Motion animations
- Dashboard shows stats cards, outgoing/incoming stream cards with shimmer progress bars
- Create Stream form has 4-step flow with validation
- Stream Detail page has progress, details, quick stats, actions, and transaction history
- Wallet connection modal and mock state are functional

The landing page already has a solid structure. This phase focuses on adding micro-interactions, loading states, animated counters, and the History page.

---

## Step 1: Landing Page Enhancements

The landing page (`src/pages/Index.tsx`) already has hero, features, how-it-works, and CTA. Enhancements:

### 1a: Add Use Cases Section
- New section between "How It Works" and CTA
- 4 expandable cards: Payroll Streaming, Token Vesting, Creator Economy, DAO Treasury
- Each card has icon, title, short description, expandable detail on click
- Uses Accordion or Collapsible component from shadcn/ui

### 1b: Add Live Protocol Stats to Hero
- Display mock stats below the subtitle: "X sBTC Streamed", "Y Active Streams"
- Stats use the counting animation (built in Step 3)
- Adds credibility and visual interest

### 1c: Enhanced Animations
- Add a water drop ripple animation behind the hero logo (uses existing `water-drop` and `ripple` keyframes)
- Staggered card entrance animations on features grid (already partially done, refine delays)
- Floating animation on the DRIP logo icon using the `float` keyframe

### Files modified:
- `src/pages/Index.tsx` — add use cases section, protocol stats, enhanced animations

---

## Step 2: Skeleton Loading States

Create skeleton components that show while data is "loading" (simulated with a brief delay).

### 2a: Skeleton Components
- `src/components/dashboard/StatsCardsSkeleton.tsx` — 3 skeleton cards matching StatsCards layout
- `src/components/StreamCardSkeleton.tsx` — skeleton matching StreamCard layout (progress bar, text lines, buttons)
- `src/components/stream-detail/StreamDetailSkeleton.tsx` — skeleton for the full stream detail page (progress bar, details card, stats grid)

### 2b: Loading Hook
- `src/hooks/use-simulated-loading.ts` — simple hook that returns `isLoading: true` for a configurable duration (e.g., 800ms), then flips to false
- Used by Dashboard, Stream Detail, and History pages to show skeletons briefly

### 2c: Integration
- `src/pages/Dashboard.tsx` — wrap StatsCards and StreamCard grids with loading state, show skeletons first
- `src/pages/StreamDetail.tsx` — show skeleton on initial load before revealing content

### Files created:
- `src/components/dashboard/StatsCardsSkeleton.tsx`
- `src/components/StreamCardSkeleton.tsx`
- `src/components/stream-detail/StreamDetailSkeleton.tsx`
- `src/hooks/use-simulated-loading.ts`

### Files modified:
- `src/pages/Dashboard.tsx`
- `src/pages/StreamDetail.tsx`

---

## Step 3: Number Counting Animations

Animated counters that tick up from 0 to the target value when elements come into view.

### 3a: CountUp Hook
- `src/hooks/use-count-up.ts` — custom hook that animates a number from 0 to a target value over a configurable duration using `requestAnimationFrame`
- Supports decimal precision (e.g., 4 decimals for sBTC amounts)
- Easing function for smooth deceleration

### 3b: AnimatedNumber Component
- `src/components/AnimatedNumber.tsx` — wrapper component that uses `useCountUp` and an IntersectionObserver to trigger animation when scrolled into view
- Props: `value`, `decimals`, `prefix`, `suffix`, `duration`
- Only animates once (not on every re-render)

### 3c: Integration
- `src/components/dashboard/StatsCards.tsx` — replace static values with `AnimatedNumber`
- `src/components/stream-detail/StreamQuickStats.tsx` — animate the stat values
- `src/pages/Index.tsx` — animate the protocol stats in hero

### Files created:
- `src/hooks/use-count-up.ts`
- `src/components/AnimatedNumber.tsx`

### Files modified:
- `src/components/dashboard/StatsCards.tsx`
- `src/components/stream-detail/StreamQuickStats.tsx`
- `src/pages/Index.tsx`

---

## Step 4: History Page

Build a fully functional History page with filtering and stream display.

### 4a: History Page (`src/pages/History.tsx`)
- Header with title and description
- Filter tabs: "All", "Completed", "Cancelled" using shadcn Tabs component
- Stream count badge next to each tab label
- Grid of StreamCard components filtered by selected tab
- Empty state when no streams match the filter
- Uses mock data filtered to completed + cancelled streams (and optionally active)

### 4b: Optional Search/Sort
- Simple text search input to filter by recipient/sender address
- Sort dropdown: "Newest First", "Oldest First", "Highest Amount"

### Files modified:
- `src/pages/History.tsx` — full implementation replacing placeholder

---

## Summary of All File Changes

| File | Action |
|------|--------|
| `src/pages/Index.tsx` | Modify — use cases section, protocol stats, enhanced animations |
| `src/components/dashboard/StatsCardsSkeleton.tsx` | Create — skeleton for stats cards |
| `src/components/StreamCardSkeleton.tsx` | Create — skeleton for stream cards |
| `src/components/stream-detail/StreamDetailSkeleton.tsx` | Create — skeleton for stream detail |
| `src/hooks/use-simulated-loading.ts` | Create — loading simulation hook |
| `src/hooks/use-count-up.ts` | Create — number animation hook |
| `src/components/AnimatedNumber.tsx` | Create — animated number component |
| `src/pages/Dashboard.tsx` | Modify — add skeletons + animated numbers |
| `src/pages/StreamDetail.tsx` | Modify — add skeleton loading |
| `src/components/dashboard/StatsCards.tsx` | Modify — use AnimatedNumber |
| `src/components/stream-detail/StreamQuickStats.tsx` | Modify — use AnimatedNumber |
| `src/pages/History.tsx` | Modify — full implementation with filters |

No new dependencies required. Uses existing shadcn/ui Tabs, Skeleton, Accordion components and Framer Motion.

