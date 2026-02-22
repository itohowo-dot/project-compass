
# Add Hint Animation to Theme Preview Card

## Verification Results
The click-to-toggle theme preview was verified on both desktop (1920px) and mobile (390px):
- Card renders correctly in dark mode by default
- Clicking toggles to light mode with smooth color transitions and icon rotation
- "Click to toggle theme" label visible below the card
- Hover and tap scale effects working

No issues found.

---

## Hint Animation

### Overview
Add a one-time "nudge" animation on first load to draw attention to the theme preview card and hint that it's clickable. Once the user clicks, the hint disappears permanently.

### File: `src/components/ThemePreview.tsx`

**Changes:**
1. Add a `hasClicked` state (default `false`) that becomes `true` on first click
2. When `hasClicked` is `false`, show a subtle pulsing ring/glow animation around the card using a `motion.div` wrapper with a repeating `animate` (scale 1 to 1.03, opacity pulse)
3. Add a small animated "hand tap" indicator -- a `MousePointerClick` icon from Lucide that gently bounces below the card, next to the "Click to toggle theme" text
4. On first click, set `hasClicked` to `true`, which fades out both the pulse ring and the tap icon
5. After the user clicks, the label remains as "Click to toggle theme" but without the bouncing icon

**Animation details:**
- Pulse ring: a `motion.div` positioned absolutely behind the card with `animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}` repeating infinitely with a 2-second duration
- Tap icon: `MousePointerClick` icon with a `motion.div` doing `animate={{ y: [0, -4, 0] }}` bouncing infinitely over 1.5 seconds
- Both wrapped in `AnimatePresence` so they fade out smoothly when `hasClicked` becomes `true`

### Technical Details

| Area | Detail |
|------|--------|
| File modified | `src/components/ThemePreview.tsx` |
| New imports | `MousePointerClick` from `lucide-react` |
| State added | `hasClicked` boolean |
| Animations | Pulse ring (repeating scale/opacity), bouncing tap icon |
| Cleanup | Both hints removed after first click via `AnimatePresence` |
| No new dependencies | Uses existing Framer Motion and Lucide |
