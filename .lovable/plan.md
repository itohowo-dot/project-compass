

# Confirmation Dialog and Fee Display Fix

## Overview

Two changes: (1) add an alert dialog that appears when the user clicks "Create Stream" on the review step, requiring explicit confirmation before submission, and (2) fix the network fee USD display to show meaningful precision for very small dollar amounts.

## Changes

### 1. Confirmation Dialog (`src/components/create-stream/StepReview.tsx`)

Replace the direct submit button with an `AlertDialog` trigger:

- The "Create Stream" button opens an `AlertDialog` instead of submitting directly
- Dialog shows a summary: "You are about to create a stream of {amount} sBTC to {recipient}. This action will submit a transaction to the Stacks network."
- Two buttons: "Cancel" (closes dialog) and "Confirm & Create" (triggers form submission)
- The "Confirm & Create" button shows the loading spinner when submitting
- Uses existing `AlertDialog` components from `@/components/ui/alert-dialog`

### 2. Fix Fee USD Display (`src/components/create-stream/StepReview.tsx`)

The current code uses `toLocaleString` with `style: "currency"` which rounds `0.0000222` to `$0.00`. Fix by:

- Calculating the raw USD value (`MOCK_FEE * MOCK_STX_USD`)
- If the value is less than $0.01, display it with enough significant digits (e.g., `~$0.000022`)
- If >= $0.01, keep the standard currency format

## Files Changed

| File | Change |
|------|--------|
| `src/components/create-stream/StepReview.tsx` | Add AlertDialog confirmation before submit; fix fee USD formatting for small amounts |
| `src/pages/CreateStream.tsx` | Minor adjustment -- pass an `onSubmit` callback prop to StepReview so the dialog can trigger form submission programmatically |

## Technical Details

- Uses existing `AlertDialog`, `AlertDialogTrigger`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogCancel`, `AlertDialogAction` from `@/components/ui/alert-dialog` (already installed)
- The "Create Stream" button becomes `type="button"` and acts as the `AlertDialogTrigger`
- The `AlertDialogAction` calls the form's `handleSubmit(onSubmit)` to trigger validation and submission
- For fee formatting: use a helper that checks if the value is below 0.01 and formats with `toFixed(6)` trimming trailing zeros, otherwise uses standard currency formatting
- No new dependencies required

