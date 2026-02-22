

# Add Subtle Animation at 100% Progress

## Overview

When the progress bar reaches 100% on the Review step, add a subtle pulse/glow animation to celebrate completion and draw attention to the fully-filled bar.

## Changes

### `src/components/create-stream/StepIndicator.tsx`

1. When `progress === 100`, add a subtle pulse glow effect to the progress bar fill using a CSS animation class
2. Change the percentage text to green/primary color with a "Complete" label instead of just "100%"
3. Add a brief scale animation on the "100%" text

Specifically:
- Add a `shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]` glow to the bar when full, plus the existing `animate-[pulse_2s_ease-in-out_infinite]` for a gentle breathing glow
- Change the percentage text from "100%" to a checkmark icon + "Complete" in primary color
- The bar fill div gets conditional classes: when at 100%, add `shadow-primary/30 shadow-[0_0_8px]` for a soft glow effect

## Technical Details

| File | Change |
|------|--------|
| `src/components/create-stream/StepIndicator.tsx` | Add conditional glow animation on fill bar at 100%, change "100%" text to "Complete" with primary color |

- Uses Tailwind's `shadow` utilities for glow effect -- no new keyframes needed
- Adds a subtle `animate-pulse` (built into Tailwind) on the bar's box-shadow at 100%
- The "Complete" text uses `text-primary font-medium` to stand out from the muted "Step X of Y" text
- Includes a small Check icon from lucide-react (already imported) next to "Complete"

