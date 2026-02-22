

# Settings Page, USD Display, and Accessibility Improvements

## 1. Settings Page (`/settings`)

### New file: `src/pages/Settings.tsx`
A placeholder settings page with three sections:

- **Wallet Management** -- shows connected wallet address, type, balance, copy address button, and disconnect button (using existing `useWallet` context)
- **Notification Preferences** -- toggles (using existing Switch component) for: stream completed, withdrawal received, stream cancelled, low balance alert. All state is local (no backend)
- **Theme Settings** -- uses existing `next-themes` `useTheme()` hook with radio/toggle group to pick light/dark/system

Layout uses `DashboardLayout` wrapper consistent with other pages.

### Route Registration
- Add `Settings` import and route in `src/components/AnimatedRoutes.tsx`

### Navigation Link
- Add a Settings link (gear icon) to `NAV_LINKS` in `src/components/Navbar.tsx`

---

## 2. USD Equivalent Display

A shared constant `MOCK_BTC_USD = 97500` will be added to `src/lib/mock-data.ts` for reuse.

### Existing (already done -- no changes needed):
- `StepAmount.tsx` already shows USD equivalent below the input
- `StepReview.tsx` already shows USD alongside the amount

### New USD additions:
- **`StreamQuickStats.tsx`** -- add USD values next to "Vested", "Withdrawable", and "Remaining" amounts
- **`StreamCard.tsx`** -- add a small USD value below the vested/remaining amounts
- **`StatsCards.tsx`** -- add USD subtitle below "Total Streaming" and "Total Received" values
- **`StreamActions.tsx`** -- show USD equivalent next to withdrawal amount in button and dialog

---

## 3. Accessibility Improvements

### ARIA on progress bars
- **`StreamCard.tsx`** (line 50): add `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label`
- **`StreamProgress.tsx`** (line 27): same treatment on the large progress bar

### ARIA labels on stream cards
- **`StreamCard.tsx`**: add `aria-label` on the root Card describing the stream (direction, amount, status)

### `aria-live` regions
- **`StatsCards.tsx`**: wrap stats in `aria-live="polite"` region
- **`StreamQuickStats.tsx`**: add `aria-live="polite"` on the stats grid

### `prefers-reduced-motion`
- **`src/index.css`**: add a `@media (prefers-reduced-motion: reduce)` block that sets `animation-duration: 0.01ms`, `transition-duration: 0.01ms`, and disables custom keyframes

---

## 4. Quick-Select Buttons (Already Implemented)

No changes needed:
- `StepAmount.tsx` lines 56-61 already render 25%, 50%, 75%, MAX buttons
- `StepDuration.tsx` lines 56-67 already render 7d, 14d, 30d, 90d, 1yr preset buttons

---

## Summary of Files Changed

| File | Change |
|------|--------|
| `src/pages/Settings.tsx` | New file -- full settings page |
| `src/components/AnimatedRoutes.tsx` | Add Settings route |
| `src/components/Navbar.tsx` | Add Settings nav link |
| `src/lib/mock-data.ts` | Export `MOCK_BTC_USD` constant |
| `src/components/stream-detail/StreamQuickStats.tsx` | USD values + aria-live |
| `src/components/StreamCard.tsx` | USD values + ARIA labels + progressbar role |
| `src/components/dashboard/StatsCards.tsx` | USD subtitles + aria-live |
| `src/components/stream-detail/StreamProgress.tsx` | progressbar role + ARIA |
| `src/components/stream-detail/StreamActions.tsx` | USD in withdraw amounts |
| `src/index.css` | prefers-reduced-motion media query |

