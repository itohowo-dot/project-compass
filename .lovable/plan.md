

# Smooth Page Transition Animations

## Overview
Add route-level page transitions using framer-motion's `AnimatePresence` so navigating between pages has a smooth fade/slide effect instead of an instant swap.

## What's Already Working
- The landing page enhancements from `.lovable/plan.md` are fully implemented (verified on mobile 390px and desktop 1920px)
- `DashboardLayout` has a basic `motion.main` fade-in, but it re-triggers on every mount rather than animating between routes

## Changes

### 1. Create an AnimatedRoutes wrapper (`src/components/AnimatedRoutes.tsx`)
- New component that wraps `<Routes>` with framer-motion's `AnimatePresence` and `useLocation`
- `AnimatePresence mode="wait"` ensures the exiting page animates out before the new one animates in
- Uses `location.pathname` as the `key` on `<Routes>` so React treats each route as a distinct element

### 2. Create a PageTransition layout component (`src/components/PageTransition.tsx`)
- A `motion.div` wrapper applied to every route's element
- Animates: fade in + slight upward slide on enter, fade out on exit
- Keeps transitions quick (200-250ms) so navigation feels snappy, not sluggish

### 3. Update `src/App.tsx`
- Replace the inline `<Routes>` block with the new `<AnimatedRoutes />` component
- Each `<Route>` element gets wrapped in `<PageTransition>`

### 4. Simplify `src/components/DashboardLayout.tsx`
- Remove the `motion.main` animation (since `PageTransition` now handles the entrance)
- Keep it as a plain `<main>` -- avoids double-animating

## Technical Details

| File | Change |
|------|--------|
| `src/components/PageTransition.tsx` | New file -- `motion.div` with fade + slide variants, `initial/animate/exit` props |
| `src/components/AnimatedRoutes.tsx` | New file -- `AnimatePresence` + `useLocation` wrapping `Routes` |
| `src/App.tsx` | Replace `<Routes>` with `<AnimatedRoutes />`, wrap each route element in `<PageTransition>` |
| `src/components/DashboardLayout.tsx` | Remove `motion.main` animation, use plain `<main>` |

### Animation Spec
- **Enter**: `opacity: 0, y: 8` to `opacity: 1, y: 0` over 250ms ease-out
- **Exit**: `opacity: 1` to `opacity: 0` over 150ms ease-in
- `AnimatePresence mode="wait"` ensures no overlap between old and new page

No new dependencies needed -- framer-motion is already installed and has `AnimatePresence` built in.
