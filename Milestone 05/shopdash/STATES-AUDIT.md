# STATES AUDIT

## Screens Reviewed

| Screen | Loading State | Error State | Empty State | Missing States |
|--------|---------------|-------------|-------------|----------------|
| Dashboard | Blank screen while fetching | No error handling visible | Empty widgets area | Loading, Error, Empty |
| Orders | Blank cards section | No retry or error message | Empty list area | Loading, Error, Empty |
| Products | Blank products grid | No error UI | No empty products message | Loading, Error, Empty |
| Customers | Blank table while loading | No visible error handling | Empty customer table | Loading, Error, Empty |

---

## Loading State Plan

- Orders page → Skeleton cards with animate-pulse
- Products page → Product card skeleton grid
- Dashboard → Spinner or stat-card skeletons
- Customers → Table row skeletons

Tailwind utilities planned:
- animate-pulse
- bg-gray-200
- rounded
- space-y-3

---

## Error State Plan

| Screen | Error Message |
|--------|----------------|
| Orders | "We couldn't load your orders. Check your connection and try again." |
| Products | "Products failed to load. Please retry." |
| Customers | "Unable to fetch customers right now." |
| Dashboard | "Dashboard data could not be loaded." |

Retry button will re-trigger fetch requests.

---

## Empty State Plan

| Screen | Title | Message | CTA |
|--------|-------|----------|-----|
| Orders | No orders yet | Your first order will appear here. | Browse Products |
| Products | No products available | Products will appear once added. | Refresh |
| Customers | No customers found | New customers will appear here. | Reload |
| Dashboard | No dashboard data | Stats will appear once data is available. | Retry |

---

## Skeleton Design Notes

Orders skeleton:
- 4 cards
- title placeholder
- subtitle placeholder
- price/status placeholder

Animation:
- animate-pulse
- gray placeholders
- rounded corners