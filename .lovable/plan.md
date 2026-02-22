

# Animated Step Transitions for Create Stream

## Overview

Add smooth slide + fade animations when navigating between steps in the Create Stream form using framer-motion (already installed). Steps will slide in from the right when advancing and from the left when going back.

## Approach

Track the navigation direction (forward/back) and use `AnimatePresence` with directional variants so that:
- **Going forward**: current step slides out left + fades, new step slides in from right + fades in
- **Going back**: current step slides out right + fades, new step slides in from left + fades in

## Changes

### `src/pages/CreateStream.tsx`

1. Import `AnimatePresence` and `motion` from `framer-motion`
2. Add a `direction` state (`1` for forward, `-1` for back) updated alongside `step`
3. Wrap the step content area with `AnimatePresence mode="wait"` and `custom={direction}`
4. Wrap each step component in a `motion.div` with:
   - `key={step}` so AnimatePresence detects changes
   - `custom={direction}` for directional variants
   - Variants: `enter` slides in from `direction * 50px` with opacity 0, `center` at 0/opacity 1, `exit` slides out to `direction * -50px` with opacity 0
   - Duration ~200-250ms with `easeOut` easing
5. Update `goNext` to set `direction` to `1` before advancing
6. Update the Back button to set `direction` to `-1` before going back

| File | Change |
|------|--------|
| `src/pages/CreateStream.tsx` | Add AnimatePresence + motion.div wrappers with directional slide/fade variants, track direction state |

## Technical Details

- `framer-motion` is already installed (v12.34.3)
- `AnimatePresence mode="wait"` ensures exit animation completes before enter begins, preventing layout overlap
- The `key={step}` prop triggers mount/unmount for AnimatePresence to detect
- Uses `custom` prop on variants for direction-aware animation without duplicating variant definitions
- Respects `prefers-reduced-motion` via framer-motion's built-in support
- No changes needed in individual step components -- the motion wrapper handles everything

