# Verification · 20 October 2026

- Production build passes (React + Vite).
- Browser: search for Kite returns one result.
- Browser: Abu Dhabi filter returns 12 matching places.
- Browser: bookmark updates saved count and persists after reload.
- Browser: adding two day-plan stops, reordering and copying a shared link work.
- Opening the copied link restores the ordered plan and opens the plan view.
- A Kite Beach note persists across reload/navigation.
- Load-more changes visible cards from 12 to 24; filtering/search cover the full dataset.
- Desktop layout inspected at 1280 × 900; phone layout inspected at 390 × 844. Phone document width and scroll width both 390, with no horizontal page overflow.
- Place-detail dialog, sources, Maps links, personal-place form and install instructions inspected.
- Offline precache includes HTML, both hashed app assets, manifest, both PNG icons and local photograph. All paths must return 200 before deployment.
- Installation and an actual disconnected reload on a physical phone have not been tested. External Maps/source websites require connectivity.
