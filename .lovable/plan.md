

# Fix History Page Tabs on 390px Mobile

## Problem
The scrollable approach works functionally but produces a poor UX at 390px: the "All" tab scrolls off-screen to the left, "Cancelled" is still clipped, and a visible scrollbar appears.

## Solution
Use a two-pronged approach:
1. **Hide the scrollbar** for cleaner appearance (CSS utility)
2. **Reduce tab padding on mobile** so all 4 tabs fit without scrolling at 390px

At 390px, roughly 358px of usable width is available (minus page padding). Each tab with badge needs about 85-90px. With `px-2` instead of `px-3` on mobile, all four tabs can fit in a single row without any scrolling.

## Changes

**File: `src/pages/History.tsx`** (lines 168-172)
- Add `scrollbar-hide` class to `TabsList` to hide the scrollbar visually
- Add responsive padding to each `TabsTrigger`: `px-2 sm:px-3` to give tabs slightly less horizontal padding on mobile, allowing all 4 to fit

**File: `src/index.css`**
- Add a `.scrollbar-hide` utility class (using `::-webkit-scrollbar` and `scrollbar-width: none`) so horizontal scroll areas don't show a scrollbar — useful across the app

This keeps the scrollable fallback for screens narrower than 390px (e.g., 320px) while ensuring all tabs are visible without scrolling at 390px.
