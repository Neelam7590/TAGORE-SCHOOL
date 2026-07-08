---
  name: Nav item height parity bug
  description: Header nav items with vs without dropdown chevrons can silently render different heights, causing visual misalignment that looks like line-wrapping.
  ---

  When some nav items have a trailing icon (e.g. dropdown chevron) and others don't, wrapping both in identical fixed-height flex containers (h-9, items-center) is NOT enough to guarantee equal rendered height in practice — items without the icon can still end up shorter, making them look like they're on a "different row" even though there's no flex-wrap anywhere.

  **Why:** Confirmed via a debug-background-color test (temporarily coloring each item's wrapper div) that no-dropdown items rendered visibly shorter boxes than dropdown items despite identical h-9/flex/items-center classes on both wrappers.

  **How to apply:** Make DOM structure between variants identical by construction — e.g. always render the icon/chevron but make it `invisible` (not `hidden`, which removes it from layout) for items that don't need it. This guarantees pixel-identical height without needing to debug the actual CSS cause.
  