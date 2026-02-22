
# Add Staggered Entrance Animation to Success Screen Summary Rows

## Overview

Add a subtle staggered fade-up animation to each summary row (Recipient, Amount, Duration, Est. End Date) on the success screen, so they reveal one by one for a polished effect.

## Changes

### `src/components/create-stream/StepSuccess.tsx`

Wrap the heading, subtitle, summary rows, and buttons in `motion` elements with staggered delays:

1. Wrap the heading (`h2`) in `motion.h2` with a fade-up animation (delay: 0.3s, after the checkmark)
2. Wrap the subtitle (`p`) in `motion.p` with fade-up (delay: 0.4s)
3. Wrap the summary card container in `motion.div` with fade-up (delay: 0.5s)
4. Convert each summary row `div` to `motion.div` with staggered delays (0.6s, 0.7s, 0.8s, 0.9s) -- each row slides up and fades in 100ms after the previous one
5. Wrap the buttons container in `motion.div` with fade-up (delay: 1.0s)

All animations use:
- `initial={{ opacity: 0, y: 12 }}`
- `animate={{ opacity: 1, y: 0 }}`
- `transition={{ duration: 0.3, ease: "easeOut", delay: X }}`

This creates a cascade effect: checkmark bounces in first, then heading, subtitle, each row one by one, and finally the action buttons.

## Technical Details

| File | Change |
|------|--------|
| `src/components/create-stream/StepSuccess.tsx` | Convert static elements to `motion` elements with staggered delay values |

- Uses `framer-motion` (already imported)
- No new dependencies
- Delays are spaced 100ms apart for a subtle, not sluggish, cascade
- Total animation sequence: ~1.3s from start to all elements visible
