
# Fix History Page Tabs on Mobile

## Problem
The `TabsList` on the History page uses `overflow-x-auto`, which causes the "All" tab to be slightly cut off on narrow screens (390px), requiring horizontal scrolling to see all tabs.

## Solution
Instead of horizontal scrolling, make the tabs stretch to fill the full width on mobile so all four tabs are always visible. Each tab will shrink its text/padding to fit.

## Changes

**`src/pages/History.tsx` (line 80)**
- Replace `overflow-x-auto` with a grid-based layout on mobile: `grid grid-cols-4 sm:inline-flex sm:w-auto`
- This ensures all 4 tabs share equal width on small screens and revert to inline layout on wider screens

**`src/components/ui/tabs.tsx` (no changes needed)**
- The existing TabsTrigger styles already handle flexible sizing

This is a single-line class change that eliminates the scroll requirement entirely.
