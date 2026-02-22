

# ENS/BNS Address Lookup and Enhanced Recent Recipients

## Overview

Enhance the recipient step in Create Stream with a mock BNS (Bitcoin Name Service) lookup that resolves `.btc` names to Stacks addresses, and upgrade the recent recipients list into a searchable dropdown with labels.

## Changes

### 1. Mock BNS Data (`src/lib/mock-data.ts`)

Add a mock BNS registry mapping `.btc` names to Stacks addresses, plus a helper function:

```text
mockBnsNames = {
  "alice.btc"  -> SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE
  "bob.btc"    -> SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS
  "carol.btc"  -> SP1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE
  "dave.btc"   -> SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KR9D
}
```

- `resolveBns(name: string): string | null` -- looks up a `.btc` name and returns the address or null
- `reverseBns(address: string): string | null` -- returns the BNS name for an address if one exists

Also add a `recentRecipients` array with label + address objects (moved out of the component):

```text
[
  { label: "alice.btc", address: "SP3FBR..." },
  { label: "bob.btc",   address: "SP2ZNG..." },
]
```

### 2. Enhanced Recipient Step (`src/components/create-stream/StepRecipient.tsx`)

**BNS Lookup:**
- When the user types a value ending in `.btc`, debounce (300ms) and call `resolveBns()`
- Show a resolved address badge below the input with a checkmark icon (e.g., "alice.btc resolves to SP3FBR...SVTE")
- If resolution fails, show a subtle error message "Name not found"
- When a BNS name resolves, set the form value to the resolved Stacks address

**Recent Recipients Dropdown:**
- Replace the current flat button list with a Popover-based searchable dropdown
- Use the existing `Command` (cmdk) component for search/filter
- Each item shows the BNS label (if available) and the truncated address
- Clicking an item fills the form field and closes the dropdown
- Trigger is a "Recent Recipients" button with a `Clock` icon below the address input

**Input Enhancement:**
- Update placeholder to `"SP... or name.btc"`
- Keep the existing paste button

### 3. Schema Update (`src/lib/create-stream-schema.ts`)

Update `recipientSchema` to also accept BNS names (`.btc` suffix) as valid input, since the component will resolve them before advancing. The regex stays as-is since the form value will be set to the resolved address, but add a note comment for clarity.

## Files Changed

| File | Change |
|------|--------|
| `src/lib/mock-data.ts` | Add `mockBnsNames`, `resolveBns()`, `reverseBns()`, and `recentRecipients` array |
| `src/components/create-stream/StepRecipient.tsx` | BNS lookup with debounce, resolved address display, searchable recent recipients dropdown using Command/Popover |

## Technical Details

- BNS lookup uses a simulated 500ms async delay to mimic network latency
- Debounce (300ms) prevents lookup on every keystroke
- The Command component from cmdk is already installed and styled
- The Popover component is already available
- No schema change needed since the resolved Stacks address is what gets set in the form
- All data remains mock -- no real BNS API calls

