
# Add Confetti Celebration Animation on Stream Creation

## Overview

When the user confirms stream creation and the submission succeeds, a confetti burst animation will play before navigating to the dashboard. This provides satisfying visual feedback for completing the flow.

## Approach

Build a lightweight confetti component using CSS animations -- no external library needed. The confetti will render as a fixed overlay with randomly positioned, colored particles that fall and fade out over ~2 seconds.

## Changes

### 1. New file: `src/components/Confetti.tsx`

A self-contained confetti component that:
- Renders a fixed full-screen overlay (pointer-events: none) with ~50 confetti particles
- Each particle is a small colored div with randomized position, rotation, delay, and color (using the app's amber/water/primary palette)
- Uses CSS keyframes for falling + rotating animation (~2s duration)
- Auto-removes itself after the animation completes via an `onComplete` callback
- Accepts an optional `duration` prop (default 2000ms)

### 2. Modified file: `src/pages/CreateStream.tsx`

- Add a `showConfetti` state (boolean, default false)
- In `onSubmit`, after the simulated delay and before navigating:
  1. Set `showConfetti = true`
  2. Show the toast
  3. Wait ~2 seconds for the confetti to play
  4. Navigate to dashboard
- Render `{showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}` in the JSX

## Technical Details

| File | Change |
|------|--------|
| `src/components/Confetti.tsx` | New component -- CSS-based confetti burst with ~50 particles, auto-cleanup |
| `src/pages/CreateStream.tsx` | Add `showConfetti` state, trigger confetti in `onSubmit` before navigation, render Confetti overlay |

- No new dependencies -- pure CSS animations with React
- Confetti particles use `position: fixed` with `inset: 0` and `pointer-events: none` so they don't block interaction
- Colors pulled from the app's design tokens (amber, water/blue, primary gold)
- Each particle gets random: x-position (0-100%), start delay (0-0.5s), fall duration (1-2.5s), rotation, size (6-10px)
- Respects `prefers-reduced-motion` by skipping the animation
- The navigation delay increases from the current 0ms (after toast) to ~2s to let the confetti play
