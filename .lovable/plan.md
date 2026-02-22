
# Add Sparkle Micro-Animation on First Theme Toggle

## Verification Results
The theme preview card was verified on both desktop (1920px) and mobile (390px):
- Entrance animation triggers correctly when scrolling into view (fade-up)
- Pulsing ring hint visible before first click
- Bouncing mouse pointer icon visible before first click
- Click toggles between dark/light with smooth transitions
- Both hint animations disappear after first click
- Card scales on hover and tap

No issues found.

---

## Sparkle Animation on First Toggle

### Overview
When the user clicks the theme preview card for the very first time, spawn a burst of small sparkle particles that radiate outward from the card and fade away. This gives satisfying visual feedback and rewards the discovery of the interactive element. The sparkle only fires once (on the first click).

### File: `src/components/ThemePreview.tsx`

**Changes:**

1. Add a `showSparkles` state that briefly becomes `true` on first click, then resets after the animation completes (~600ms)
2. When `showSparkles` is `true`, render 8-10 small sparkle dots using `motion.div` elements positioned absolutely around the card center
3. Each sparkle particle:
   - Starts at the card center (scale 0, opacity 1)
   - Animates outward in a random radial direction (using pre-computed x/y offsets distributed evenly around a circle)
   - Fades out (opacity 0) and scales down slightly
   - Duration: ~500-600ms with staggered delays
   - Color: uses the primary/amber color (`hsl(36 90% 54%)`) for consistency with the brand
4. After the animation completes, `showSparkles` resets to `false` and the sparkle elements unmount via `AnimatePresence`

**Implementation approach:**
- Define an array of 8 sparkle configs with pre-computed `x` and `y` end positions (evenly distributed in a circle, radius ~60px)
- Map over this array inside an `AnimatePresence` block
- Each sparkle is a small `motion.div` (6x6px rounded-full) with `initial`, `animate`, and `exit` props
- Trigger via a `useEffect` that sets a timeout to clear `showSparkles` after 700ms

### Technical Details

| Area | Detail |
|------|--------|
| File modified | `src/components/ThemePreview.tsx` |
| New state | `showSparkles` boolean |
| Particle count | 8 dots |
| Animation duration | ~500ms per particle with slight stagger |
| Trigger | First click only (when `hasClicked` transitions from false to true) |
| Cleanup | Particles unmount after animation via timeout + AnimatePresence |
| No new dependencies | Uses existing Framer Motion |
