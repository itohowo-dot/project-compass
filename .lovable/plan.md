

# Inline Form Validation with Accessible Error Messages

## What's Already Working
- Each step uses `FormField` / `FormMessage` to show inline errors
- `FormControl` already sets `aria-invalid` and `aria-describedby` on inputs
- The `goNext()` function validates per-step and calls `form.setError()` to surface issues
- Zod schemas already have descriptive error messages

## What's Missing
1. **Screen reader announcements** -- `FormMessage` doesn't have `role="alert"` or `aria-live`, so errors appear visually but aren't announced
2. **Balance-aware validation** -- the amount step shows the balance but doesn't prevent exceeding it
3. **Real-time validation feedback** -- form mode is `onTouched` but some fields (like amount) would benefit from showing success states too
4. **Step-level error summary** -- when `goNext()` fails, there's no top-level announcement that errors exist

## Changes

### 1. `src/components/ui/form.tsx` -- Add `role="alert"` to FormMessage

Add `role="alert"` to the `FormMessage` `<p>` element. This is the standard accessible way to announce dynamic error text to screen readers. Since `FormMessage` only renders when an error exists, `role="alert"` will trigger an announcement each time it appears.

### 2. `src/components/create-stream/StepAmount.tsx` -- Balance validation

Add a `useEffect` that registers a custom validation via `form.register` or triggers `form.setError` when amount exceeds balance. Show a warning `Alert` component when the entered amount is greater than the wallet balance, with `role="alert"` for accessibility.

### 3. `src/components/create-stream/StepRecipient.tsx` -- Success state

After BNS resolution succeeds, clear any existing form error on `recipientAddress` so the green badge and absence of error text provide a clear success signal.

### 4. `src/pages/CreateStream.tsx` -- Step-level error announcement

Add an `aria-live="assertive"` region that announces "Please fix the errors below" when `goNext()` validation fails. This helps screen reader users understand why the step didn't advance.

### 5. `src/lib/create-stream-schema.ts` -- Improved error messages

Refine error messages to be more descriptive and actionable:
- `recipientAddress`: "Enter a valid Stacks address starting with SP, or use a .btc name"
- `amount`: "Enter an amount between 0 and 21,000,000 sBTC"
- `durationDays`: "Choose a duration between 1 and 365 days"

## Files Changed

| File | Change |
|------|--------|
| `src/components/ui/form.tsx` | Add `role="alert"` to `FormMessage` |
| `src/components/create-stream/StepAmount.tsx` | Balance exceeded warning with accessible Alert |
| `src/components/create-stream/StepRecipient.tsx` | Clear form error on successful BNS resolution |
| `src/pages/CreateStream.tsx` | Add `aria-live` error announcement region on step validation failure |
| `src/lib/create-stream-schema.ts` | Improved, more descriptive error messages |

## Technical Notes
- `role="alert"` is the W3C-recommended approach for form errors -- it triggers an implicit `aria-live="assertive"` announcement
- No new dependencies needed
- Balance validation is client-side only (mock data), using the existing `useWallet` hook already imported in `StepAmount`
