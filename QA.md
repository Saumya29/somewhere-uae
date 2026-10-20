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

## Real-photo update
- Selected nine location-matched photographs after reviewing a contact sheet and the Kite Beach original.
- Recorded Commons source, photographer, original-file URL, CC licence URL and responsive crop disclosure for each image.
- Removed generic SVG illustrations from place cards, details and discovery collections. Places without a photo use text cards.
- Checked phone layout at 390px: document width and scroll width both 390; card width 167.5px in the two-column grid.
- Checked the Kite Beach photo, per-place credit, full nine-photo credits dialog and House of Wisdom detail without a photo.
- All nine local photo files are included in the generated offline precache.
