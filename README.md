# Somewhere
A React + Vite progressive web app for discovering UAE outings.

## Local development
`npm ci` then `npm run dev`. `npm run build` produces `dist/`; `npm run preview` serves that build.

## Features
61 sourced places, emirate/activity/search filters, saved places, ordered day plans, shareable guide-place plans, personal discoveries and notes. Local storage persists changes on one device, without an account. No cross-device sync. Shared plans include researched guide places only, not personal discoveries or notes.

Manifest and icons support home-screen installation. The service worker caches the app shell, guide, image and assets after first online visit. External source and Maps links need connectivity. New releases use a new service-worker cache name; existing tabs close before a waiting worker updates.

## Editorial integrity
Data copied from outputs/uae-guide/UAE_Places_Collection.json on 20 October 2026. Current price, opening hours, access, bookings, coordinates and operating status are not verified. Preserve source links and caveats. Maps links are generated name searches. Illustrations describe an activity type, not an exact venue. Personal entries stay local.

## Design references and assets
Structure inspiration: https://dribbble.com/shots/27034775-Travel-Discovery-Itinerary-Planning-Mobile-App-UI by Fokhrul Islam Suhan for Creliq. Original app layout, palette and SVG illustrations. No Dribbble artwork is used in the app.
Al Fahidi photograph: https://unsplash.com/fr/s/photos/Al-Fahidi (image photo-1720754093410-434add6786b1), local optimized image. Fonts: DM Sans and Manrope via Google Fonts, with system fallbacks offline.
