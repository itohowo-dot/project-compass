

# Add Pagination to Transaction Log

## Overview
Add pagination controls below the transaction table so that when there are many transactions, they are split into pages of 5 rows each. This keeps the table compact and scannable.

## Verification Results
- Both Streams and Transactions views render correctly on desktop and mobile (390px)
- Type filtering (All/Created/Withdrawn/Cancelled) works correctly
- Search and sort work for both views
- On mobile, Counterparty column hides via `hidden sm:table-cell` as expected
- Tx Hash column also hides on mobile -- table shows Type, Amount, Stream, and Date

## Changes (single file: `src/pages/History.tsx`)

### 1. Add pagination state
- New state: `const [txPage, setTxPage] = useState(1)`
- Constant: `const TX_PER_PAGE = 5`
- Reset page to 1 whenever filters change (txType, search, sort)

### 2. Slice filtered transactions for current page
- Derive `paginatedTxs = filteredTxs.slice((txPage - 1) * TX_PER_PAGE, txPage * TX_PER_PAGE)`
- Derive `totalPages = Math.ceil(filteredTxs.length / TX_PER_PAGE)`
- Render `paginatedTxs` in the table body instead of `filteredTxs`

### 3. Add pagination controls below the table
- Use the existing `Pagination` components from `src/components/ui/pagination.tsx`
- Show: Previous button, page number buttons (with ellipsis for large page counts), Next button
- Show a "Showing X-Y of Z transactions" label on the left
- Hide pagination when total items fit on one page
- Disable Previous on page 1, disable Next on last page

## Technical Details

| Area | Detail |
|------|-----------|
| Page size | 5 transactions per page |
| Page reset | `useEffect` resets `txPage` to 1 when `txType`, `search`, or `sort` changes |
| Pagination UI | Uses existing `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis` components |
| Page numbers | Show first page, last page, current page +/- 1, with ellipsis for gaps |
| Import additions | `useEffect` from React, Pagination components from `@/components/ui/pagination` |

No new files or dependencies needed.
