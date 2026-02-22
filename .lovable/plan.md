

# Add More Mock Transactions for Pagination Testing

## Overview
Expand `mockTransactions` in `src/lib/mock-data.ts` from 9 to ~30 entries to properly test pagination with ellipsis behavior (6+ pages at 5 per page).

## Changes

### `src/lib/mock-data.ts`
- Add ~21 new transaction entries to `mockTransactions`, bringing the total to 30
- Transactions will be spread across the existing 5 streams (IDs "1" through "5")
- Mix of all three types: `created`, `withdrawn`, `cancelled`
- Varying amounts (0.01 - 1.0 sBTC), dates spanning Dec 2025 - Feb 2026, and sequential block heights
- Unique tx hashes and IDs (t10 through t30)

### No other file changes needed
- `History.tsx` already reads from `mockTransactions` and paginates at 5 per page
- With 30 transactions, there will be 6 pages, which triggers the ellipsis logic in the pagination controls

## Technical Details

| Area | Detail |
|------|--------|
| File | `src/lib/mock-data.ts` |
| Current count | 9 transactions |
| Target count | 30 transactions |
| Pages at 5/page | 6 pages (triggers ellipsis) |
| Stream distribution | Spread across streams 1-5 |
| Type distribution | ~10 created, ~14 withdrawn, ~6 cancelled |

