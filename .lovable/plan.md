

# Fix History Page Tabs on 390px Mobile -- Take 3

## Problem
At 390px viewport width, there's roughly 358px of usable space. Four tabs ("All 5", "Active 3", "Completed 1", "Cancelled 1") with badges simply cannot fit -- each needs ~85-95px, totaling ~350-380px with gaps, causing overflow.

## Solution
Use a combined approach:
1. **Hide badges on mobile** -- badges are informative but not essential; removing them on narrow screens saves ~30px per tab
2. **Keep reduced padding** (`px-2 sm:px-3`) to maximize space
3. **Keep scrollbar hidden and overflow-x-auto** as a safety net for screens smaller than 390px

## Changes

**File: `src/pages/History.tsx`** (lines 168-172)
- Wrap each `Badge` inside the tabs with `hidden sm:inline-flex` so badges only appear on screens >= 640px
- This reduces each tab to just the text label ("All", "Active", "Completed", "Cancelled"), which easily fits at 390px

The tab text alone at `px-2` padding: ~40px + ~55px + ~85px + ~80px = ~260px, well within 358px.

On `sm:` and above, badges reappear and padding increases, restoring the full desktop experience.

