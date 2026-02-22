

# Improved Mobile Navigation

## Current Issues

The mobile navigation has two problems:
1. **The hamburger menu** opens a basic dropdown below the header showing the same 3 links that are already in the bottom tab bar -- it's redundant and feels unfinished
2. **No access to wallet or theme toggle** in the mobile menu -- on narrow screens the wallet button text gets cramped in the top bar
3. **No animation** on the mobile menu open/close -- it just pops in and out

## Solution

Replace the plain dropdown mobile menu with a proper **slide-in Sheet** (sidebar drawer) that includes navigation links, wallet info, and theme toggle -- all in one polished panel. Keep the bottom tab bar for quick navigation.

### What changes:

**`src/components/Navbar.tsx`**
- Replace the inline mobile dropdown (lines 63-88) with a `<Sheet>` component that slides in from the right
- The hamburger button opens the Sheet instead of toggling a state variable
- Inside the Sheet, include:
  - DRIP logo and brand at the top
  - Navigation links (Dashboard, Create, History) with active states and 44px min touch targets
  - A divider/separator
  - Wallet connection status (address, balance) or "Connect Wallet" button
  - Theme toggle (light/dark switch)
  - Close button (built into Sheet)
- Remove the `mobileOpen` state since Sheet manages its own open/close
- Add smooth slide-in animation (comes free with the Sheet component)
- Add ARIA label to the hamburger button for accessibility

**`src/components/WalletButton.tsx`**
- Extract a `WalletInfo` variant or add a `variant` prop that renders a simplified mobile-friendly layout (full-width button style) for use inside the Sheet
- Or: just reuse the existing `WalletButton` inside the Sheet as-is since it already works standalone

### No new dependencies needed
The project already has `@radix-ui/react-dialog` (Sheet) and all required UI components.

### Technical Details

| File | Change |
|------|--------|
| `src/components/Navbar.tsx` | Replace inline mobile menu with Sheet drawer; add wallet + theme toggle inside; add aria-label to hamburger |
| `src/components/WalletButton.tsx` | No changes needed -- reuse as-is inside the Sheet |

The bottom tab bar stays as-is for quick thumb-accessible navigation. The Sheet provides full access to all app functions including wallet and theme switching.
