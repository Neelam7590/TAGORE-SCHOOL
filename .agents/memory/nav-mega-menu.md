---
name: Navigation mega menu
description: How the Header.tsx mega menu works — menuConfig drives dropdowns, mega=true = wide dropdown.
---

The Header.tsx uses a `menuConfig` object keyed by nav label. Each entry has `items: DropdownItem[]` and optionally `mega: true`.

- `mega: true` → renders `MegaDropdown` (w-80, grid layout)
- no `mega` → renders `SimpleDropdown` (w-60, stacked list)

Mega menus: Gallery, Student Corner, Achievements, School Calendar
Simple dropdowns: About, Academics, Facilities, Login

NavItem component handles hover open/close with mouseEnter/Leave + click toggle. Mobile uses accordion via AnimatePresence.

**Why:** Large dropdown categories (5+ items) need the wider mega layout for readability.

**How to apply:** To add a new top-level nav item with a dropdown, add to `menuConfig` and to `navLinks` array. Set `mega: true` if it has 5+ items.
