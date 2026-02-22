
# Add Progress Bar to Step Indicator

## Overview

Add an animated progress bar below the step circles in the Create Stream form that shows overall completion percentage (25% per step). This gives users a clear visual sense of how far along they are.

## Design

A thin horizontal progress bar will be added below the existing step indicator row. It will:
- Show 25% filled per completed/current step (Step 1 = 25%, Step 2 = 50%, Step 3 = 75%, Step 4 = 100%)
- Use the existing `gradient-primary` styling for consistency with the checkmark circles
- Animate smoothly when advancing or going back using a CSS transition
- Display "Step X of 4" text with the percentage on the right

## Changes

### `src/components/create-stream/StepIndicator.tsx`

- Calculate progress percentage: `(currentStep / 4) * 100`
- Add a progress bar section below the step circles:
  - A full-width `bg-border` track (thin, rounded)
  - An inner `bg-primary` fill bar with `transition-all duration-300` for smooth animation
  - A small text row showing "Step X of 4" on the left and "XX%" on the right
- No new dependencies needed -- uses simple div-based progress bar with Tailwind classes

## Technical Details

| File | Change |
|------|--------|
| `src/components/create-stream/StepIndicator.tsx` | Add progress bar track + animated fill below step circles, plus "Step X of 4 -- XX%" text |

- Progress calculation: `const progress = (currentStep / steps.length) * 100`
- The bar uses `style={{ width: \`${progress}%\` }}` with `transition-all duration-300 ease-out` for smooth animation
- Keeps the existing step circles and connector lines unchanged
- Responsive: works on all viewports since it's a simple full-width bar
