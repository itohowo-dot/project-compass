

# Refactor Transactions View: Card Layout on Mobile

## Problem
On 390px mobile, the transactions table overflows horizontally, clipping "Date" and "Tx Hash" columns. Users must scroll horizontally which is poor UX.

## Solution
Show a **card-based layout on mobile** (`< sm`) and keep the **existing table on desktop** (`>= sm`). Each card stacks key info vertically: type badge + amount on top row, stream link + date on second row, tx hash + counterparty on third row.

## Changes

### File: `src/pages/History.tsx`

**1. Loading skeleton** (lines 201-213): Add a mobile-friendly skeleton variant using `sm:hidden` / `hidden sm:block` to show card skeletons on mobile and row skeletons on desktop.

**2. Transaction rendering** (lines 237-297): Replace the single `<Table>` block with two variants:
- **Mobile cards** (`sm:hidden`): A `div` with stacked cards for each transaction, showing:
  - Row 1: Type badge (left) + Amount in mono font (right)
  - Row 2: Stream link (left) + Date (right)  
  - Row 3: Counterparty (left) + Tx hash with external link icon (right)
  - Cards separated by borders, wrapped in a rounded border container
- **Desktop table** (`hidden sm:block`): The existing `<Table>` markup, unchanged

**3. Pagination** (lines 299-330): No changes needed -- pagination already works responsively.

## Technical Details

The card markup per transaction will look roughly like:

```text
+--------------------------------------+
| [Created]              0.5000 sBTC   |
| Stream #1        Jan 15, 2025        |
| SP2J...abc         0x1a2b...  [ext]  |
+--------------------------------------+
```

- Uses existing `typeConfig` for badge styling
- Reuses `formatAddress`, `format` from date-fns
- Wrapped in the same `rounded-lg border border-border/50` container as the table
- Individual cards use `border-b border-border/50 last:border-0` for separation
- No new components or dependencies needed

