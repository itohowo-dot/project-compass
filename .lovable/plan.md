
# Fix Truncated Tab Text on Narrow Mobile Screens

## Problem
The "Completed" and "Cancelled" tab labels with their badge counts get truncated on 390px screens because the 4-column grid doesn't leave enough room.

## Solution
Make the tabs horizontally scrollable on mobile instead of using a fixed 4-column grid. This preserves the full label text while remaining touch-friendly.

## Changes

**File: `src/pages/History.tsx`** (line 168)
- Replace `grid grid-cols-4 sm:inline-flex sm:w-auto` on `TabsList` with `flex w-full overflow-x-auto sm:inline-flex sm:w-auto` so tabs scroll horizontally on narrow screens
- Add `flex-shrink-0` to each `TabsTrigger` to prevent text compression

This is a minimal change -- two classes on the list and a utility class on each trigger. No abbreviations needed, and all four tabs remain fully readable at any width.
