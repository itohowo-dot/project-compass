

# Phase 2: Core Features Implementation

This plan covers building the Dashboard, Create Stream form, and Stream Detail pages with full mock data and interactive UI.

---

## Step 1: Mock Data Layer

Create a shared mock data module (`src/lib/mock-data.ts`) containing:

- TypeScript types for `Stream`, `StreamStatus`, `StreamDirection`, `Transaction`
- 5-6 mock streams with varied statuses (active outgoing, active incoming, completed, cancelled)
- Mock transaction history entries (created, withdrawn events)
- Helper functions: `getTimeLeft()`, `getProgress()`, `formatAddress()`

This gives all three pages a consistent data source.

---

## Step 2: Dashboard Page (Phase 2.1 + 2.2)

### 2a: Stats Cards Component (`src/components/dashboard/StatsCards.tsx`)
- Three cards in a responsive row: "Total Streaming", "Total Received", "Active Streams"
- Each card: icon, label, large value (sBTC amount or count), subtle subtitle
- Uses the Card component with gradient-card styling and glow on hover

### 2b: Stream Card Component (`src/components/StreamCard.tsx`)
- Reusable card showing: direction icon (up arrow for outgoing, down for incoming), truncated address, status badge (Active=amber, Completed=green, Cancelled=red)
- Animated progress bar with shimmer effect for active streams
- Vested vs remaining amounts, time left countdown
- Action buttons: "View Details" link, contextual "Cancel" or "Withdraw"
- Hover: card lifts with shadow-card-hover

### 2c: Dashboard Page Update (`src/pages/Dashboard.tsx`)
- Greeting banner with time-of-day ("Good morning/afternoon/evening, Builder")
- StatsCards row
- "Outgoing Streams" section with stream cards + "Create Stream" button
- "Incoming Streams" section with stream cards
- Empty state component when no streams exist (illustration + CTA)

---

## Step 3: Create Stream Form (Phase 2.3)

### 3a: Form State & Validation (`src/lib/create-stream-schema.ts`)
- Zod schema for each step and combined form
- Fields: recipientAddress, amount, durationDays, with validation rules

### 3b: Step Components (in `src/components/create-stream/`)
- **StepIndicator.tsx**: Progress bar showing 4 steps with labels, current step highlighted in primary
- **StepRecipient.tsx**: Address input with paste button, Stacks address format validation, recent recipients list (mock)
- **StepAmount.tsx**: sBTC amount input, USD conversion display (mock rate), wallet balance shown, quick-select buttons (25%, 50%, 75%, MAX)
- **StepDuration.tsx**: Duration input (days), block height conversion display, preset buttons (7d, 14d, 30d, 90d, 1yr), calculated streaming rate
- **StepReview.tsx**: Full summary card with all parameters (from, to, amount, duration, rate, estimated dates, network fee), escrow disclosure note, "Create Stream" CTA button

### 3c: CreateStream Page Update (`src/pages/CreateStream.tsx`)
- Multi-step form container using React Hook Form with Zod resolver
- Step state management (currentStep 1-4)
- Back/Continue navigation with per-step validation
- On submit: toast success notification + redirect to dashboard

---

## Step 4: Stream Detail Page (Phase 2.4)

### 4a: Detail Components (in `src/components/stream-detail/`)
- **StreamProgress.tsx**: Large animated progress bar with percentage label, shimmer on active, sender-to-recipient visual with addresses
- **StreamDetailsCard.tsx**: Card with status badge, sender, recipient, total amount, duration, start/end block heights, created date
- **StreamQuickStats.tsx**: Grid of stat items: Vested, Withdrawn, Withdrawable, Remaining, Time Left, Daily Rate
- **StreamActions.tsx**: Withdraw button (for incoming, shows withdrawable amount) and Cancel button (for outgoing), each with AlertDialog confirmation modal
- **TransactionHistory.tsx**: Table/list of on-chain events (stream created, withdrawals) with mock tx hashes, timestamps, amounts, and "View on Explorer" links

### 4b: StreamDetail Page Update (`src/pages/StreamDetail.tsx`)
- Looks up stream by ID from mock data
- "Back to Dashboard" breadcrumb link
- StreamProgress visualization at top
- Two-column grid on desktop (Details + Quick Stats left, Actions + History right)
- 404-style state if stream ID not found

---

## Files Created/Modified

| File | Action |
|------|--------|
| `src/lib/mock-data.ts` | Create - types + mock streams + helpers |
| `src/lib/create-stream-schema.ts` | Create - Zod validation schemas |
| `src/components/dashboard/StatsCards.tsx` | Create |
| `src/components/StreamCard.tsx` | Create |
| `src/components/create-stream/StepIndicator.tsx` | Create |
| `src/components/create-stream/StepRecipient.tsx` | Create |
| `src/components/create-stream/StepAmount.tsx` | Create |
| `src/components/create-stream/StepDuration.tsx` | Create |
| `src/components/create-stream/StepReview.tsx` | Create |
| `src/components/stream-detail/StreamProgress.tsx` | Create |
| `src/components/stream-detail/StreamDetailsCard.tsx` | Create |
| `src/components/stream-detail/StreamQuickStats.tsx` | Create |
| `src/components/stream-detail/StreamActions.tsx` | Create |
| `src/components/stream-detail/TransactionHistory.tsx` | Create |
| `src/pages/Dashboard.tsx` | Update - full dashboard |
| `src/pages/CreateStream.tsx` | Update - multi-step form |
| `src/pages/StreamDetail.tsx` | Update - full detail page |

No new dependencies required -- everything uses existing shadcn/ui components, React Hook Form, Zod, Framer Motion, and Lucide icons.

