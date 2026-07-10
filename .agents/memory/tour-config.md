---
name: Tour Config Architecture
description: How the guided website tour is structured and where to edit tour steps
---

# Tour Config Architecture

## Config file location
`artifacts/tagore-school/src/config/tourConfig.ts`

Edit this file to add/remove/reorder tour stops. Each `TourStep` has:
- `label` / `labelHi` — shown in progress bar
- `page` — route path e.g. `"/"` or `"/about"`
- `section?` — element `id` to scroll to (without `#`); omit to scroll to page top
- `speech` / `speechHi` — robot voice text

## Section IDs added to pages
All pages now have section `id` attributes for the tour to scroll to:
- **Home**: `hero`, `about-intro`, `principal-preview`, `programs-preview`, `kindergarten-preview`, `why-choose`, `facilities-preview`, `gallery-preview`, `testimonials`, `admission-cta`
- **About**: `about-hero`, `journey`, `vision`, `values`, `faculty`
- **Academics**: `academics-hero`, `programs`, `streams`, `methodology`, `achievements`
- **Facilities**: `facilities-hero`, `facilities-list`, `transport`, `safety`, `green`
- **Gallery**: `gallery-filter`, `gallery-grid`
- **Director**: `director-hero`, `director-content`
- **Principal**: `principal-hero`, `principal-content`
- **Contact**: `contact-hero`, `contact-section`
- **Admissions**: `admission-form-section`

## Tour steps count
29 steps total (9 Home + 5 About + 2 Director + 2 Principal + 5 Academics + 4 Facilities + 1 Gallery + 2 Admissions + 1 Contact)

## ChatWidget tour features
- Auto-advance after TTS voice ends (1.2 s pause) using `onEnd` callback
- **Previous** button (disabled on step 0)
- **Skip/Next** button
- **Finish Tour** replaces Skip on last step
- **Stop** button (red StopCircle)
- Gold glow highlight on target section (`data-tgs-hi` attribute + inline outline)
- Progress bar + "Step X of Y"
- sessionStorage persistence for page refresh during tour
- `tourRunIdRef` incremented on stop/skip/prev to cancel stale callbacks

**Why:** Race condition guard is critical — `stop()` must cancel pending `onEnd` timer. `tourRunIdRef` provides an additional guard so stale closures can't advance the tour after it's been stopped or skipped.
