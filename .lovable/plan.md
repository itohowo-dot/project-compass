

# Add Transaction Log to History Page

## Overview
The History page currently shows stream cards filtered by status. This enhancement adds a second view mode -- a **Transaction Log** -- that shows all individual transactions (created, withdrawn, cancelled) in a filterable table, giving users a detailed audit trail of all activity.

## Changes

### 1. Add a view toggle to `src/pages/History.tsx`
- Add a "Streams" / "Transactions" toggle (using the existing Tabs or a segmented button) at the top of the page
- "Streams" view keeps the current card grid (unchanged)
- "Transactions" view shows a new table-based transaction log

### 2. Build the Transaction Log section (inline in History.tsx)
- Uses the existing `Table` component and `mockTransactions` data
- Enriches each transaction with the parent stream's sender/recipient info via `getStreamById`
- Columns: Type (badge), Amount, Stream (linked to `/stream/:id`), Counterparty (formatted address), Date, Tx Hash (external link)
- Filters:
  - **Type filter**: All / Created / Withdrawn / Cancelled (using a Select dropdown)
  - **Search**: Reuses the existing search input to filter by address or tx hash
  - **Sort**: Reuses the existing sort dropdown (newest/oldest/highest amount)
- Empty state with icon when no transactions match

### 3. Mobile responsiveness
- Table uses `overflow-auto` wrapper (already built into the Table component)
- On small screens, the Counterparty and Block columns are hidden via `hidden sm:table-cell`
- Tx hash column stays compact (truncated with ellipsis + external link icon)

## Technical Details

| Area | Detail |
|------|--------|
| Data source | `mockTransactions` from `src/lib/mock-data.ts` (9 transactions across 5 streams) |
| Stream lookup | `getStreamById(tx.streamId)` to get sender/recipient for each transaction |
| Address formatting | Existing `formatAddress()` helper |
| Date formatting | `date-fns` `format()` (already used in TransactionHistory component) |
| Type badges | Reuse the same `typeConfig` pattern from `TransactionHistory.tsx` (created=primary, withdrawn=accent, cancelled=destructive) |
| View toggle | New state `const [view, setView] = useState<"streams" | "transactions">("streams")` with two buttons or a TabsList |
| Loading state | Reuse `useSimulatedLoading` with skeleton rows for the table |

### File changes
- `src/pages/History.tsx` -- Add view toggle, transaction log table with filters, skeleton loading state. The existing streams view remains untouched behind the "Streams" tab.

No new files or dependencies needed.
