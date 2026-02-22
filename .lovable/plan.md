

# Improve Light Theme Contrast in ThemePreview

## Problem
The light theme palette in the `ThemePreview` component uses colors that are too close in lightness, resulting in a washed-out appearance with poor visual separation between the background, card, border, and progress bar track.

## Changes

### File: `src/components/ThemePreview.tsx`

Update the `LIGHT` constant (lines 5-16) with improved contrast values:

| Token | Current | New | Reason |
|-------|---------|-----|--------|
| `bg` | `hsl(40 40% 96%)` | `hsl(40 30% 94%)` | Slightly darker background for better card separation |
| `card` | `hsl(40 30% 100%)` | `hsl(0 0% 100%)` | Pure white card for clear contrast against bg |
| `border` | `hsl(40 20% 88%)` | `hsl(40 15% 80%)` | Noticeably darker border for visible edges |
| `muted` | `hsl(30 8% 55%)` | `hsl(30 10% 45%)` | Darker muted text for better readability |
| `barBg` | `hsl(40 20% 90%)` | `hsl(40 15% 84%)` | Darker track so the amber bar stands out more |

The `text`, `bar`, and dot colors remain unchanged as they already have good contrast.

## Impact
- Only affects the self-contained mini preview card -- no effect on the actual app theme
- All animations and interactions remain unchanged

