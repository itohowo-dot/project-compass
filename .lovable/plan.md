

# Elevate UI/UX to Enterprise-Grade Polish

## Overview

Address 7 identified gaps to bring the app from "very polished" to true production/enterprise quality. Each improvement is targeted and follows existing patterns.

---

## 1. Global Error Boundary

**Problem**: Any uncaught React error white-screens the app.

**Solution**: Create an `ErrorBoundary` class component that catches errors and renders a friendly fallback with a "Try Again" button. Wrap the app in `App.tsx`.

**Files**:
- New: `src/components/ErrorBoundary.tsx` -- class component with `componentDidCatch`, renders a centered card with an alert icon, "Something went wrong" message, error details in dev mode, and a "Reload" button
- Modified: `src/App.tsx` -- wrap `<BrowserRouter>` inside `<ErrorBoundary>`

---

## 2. Confirmation Dialogs on StreamCard Buttons

**Problem**: The Cancel/Withdraw buttons on the dashboard `StreamCard` do nothing except show text -- no confirmation dialog like the `StreamDetail` page has.

**Solution**: Add `AlertDialog` wrappers to the Cancel and Withdraw buttons on `StreamCard`, matching the pattern already used in `StreamActions.tsx`.

**Files**:
- Modified: `src/components/StreamCard.tsx` -- wrap the Cancel button in an `AlertDialog` with "Cancel Stream?" confirmation, and the Withdraw button in an `AlertDialog` with "Confirm Withdrawal" confirmation. Both show a toast on confirm.

---

## 3. Wallet Connection Guard on Create Stream

**Problem**: Users can navigate to `/create` and fill out the form without a connected wallet, only to hit issues at review/submit.

**Solution**: Show a "Connect Wallet" prompt on the Create Stream page when no wallet is connected, blocking the form until connected.

**Files**:
- Modified: `src/pages/CreateStream.tsx` -- import `useWallet`, check `connected`, and if not connected, render a centered card with a wallet icon, "Connect your wallet to create a stream" message, and the `WalletButton` component instead of the form

---

## 4. Breadcrumb Navigation on Stream Detail

**Problem**: Stream Detail page has only a "Back to Dashboard" ghost button -- no breadcrumb trail for wayfinding.

**Solution**: Add a breadcrumb bar: Dashboard > Stream #X.

**Files**:
- Modified: `src/pages/StreamDetail.tsx` -- replace the "Back to Dashboard" button with a `Breadcrumb` using the existing `src/components/ui/breadcrumb.tsx` primitives: `BreadcrumbList > BreadcrumbItem(Dashboard link) > BreadcrumbSeparator > BreadcrumbItem(Stream #id as current page)`

---

## 5. Enhanced Empty States

**Problem**: Empty states are minimal -- just an icon and one line of text.

**Solution**: Add a subtitle with guidance and slightly more visual presence.

**Files**:
- Modified: `src/pages/Dashboard.tsx` -- update `EmptyState` to include a heading ("No streams yet") and a descriptive subtitle ("Create your first payment stream to start sending or receiving sBTC"), plus a slightly larger icon
- Modified: `src/pages/History.tsx` -- locate the empty state in the streams view and add a similar descriptive subtitle

---

## 6. Light Mode Polish

**Problem**: Some gradients and glass effects may lack contrast in light mode.

**Solution**: Audit and tweak key visual elements for light mode specifically.

**Files**:
- Modified: `src/index.css` -- adjust light mode CSS variables:
  - Increase `--border` contrast slightly (from 85% lightness to 82%)
  - Ensure `gradient-glass` has adequate opacity in light mode (adjust `--glass-from` and `--glass-to`)
  - Add a subtle border-bottom shadow to the navbar in light mode for definition
- Modified: `src/components/StreamCard.tsx` -- add a light-mode-specific hover shadow using a slightly darker amber tint

---

## 7. Mobile History Page Spacing

**Problem**: The Streams/Transactions toggle buttons on the History page may crowd on small screens.

**Files**:
- Modified: `src/pages/History.tsx` -- make the header section wrap properly on mobile: use `flex-wrap gap-3` on the filter row, ensure the search input is `w-full` on mobile via responsive classes

---

## Summary of All Changes

| # | File | Change |
|---|------|--------|
| 1 | `src/components/ErrorBoundary.tsx` (new) | Global error boundary with friendly fallback UI |
| 1 | `src/App.tsx` | Wrap app in ErrorBoundary |
| 2 | `src/components/StreamCard.tsx` | Add AlertDialog confirmations to Cancel/Withdraw buttons |
| 3 | `src/pages/CreateStream.tsx` | Wallet connection guard before showing form |
| 4 | `src/pages/StreamDetail.tsx` | Replace back button with breadcrumbs |
| 5 | `src/pages/Dashboard.tsx` | Enhanced empty state with heading + subtitle |
| 5 | `src/pages/History.tsx` | Enhanced empty state with subtitle |
| 6 | `src/index.css` | Light mode contrast and gradient tweaks |
| 7 | `src/pages/History.tsx` | Mobile-responsive filter row spacing |

