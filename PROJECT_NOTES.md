# Project Notes

## Path

- Project root: `/Users/wuke/Desktop/codex/reigns_bp_v3`

## Current State

- The game has been expanded into a fuller `Reigns-like` BP sim.
- Current content counts:
  - `baseEvents`: 120
  - `chainEvents`: 36
  - `delayedEffects`: 56
- The event presentation has already been pushed toward a more `Reigns` feel:
  - dialogue-style title and follow-up text
  - more symbolic central card
  - stronger chain-event and ending copy

## File Structure

- Main app and game loop:
  - `src/App.jsx`
- Data split out of the giant app file:
  - `src/data/scenarios.js`
  - `src/data/baseEvents.js`
  - `src/data/chainEvents.js`
  - `src/data/delayedEffects.js`
  - `src/data/personaDefs.js`

## Build

- Install: `npm install`
- Verify: `npm run build`
- Latest split build has been verified successfully.

## Important Notes

- The conservative split is complete: data is modularized, while logic and UI still live in `src/App.jsx`.
- `generate_app.mjs` is still based on the old single-file generation flow and should be treated as a legacy helper until it is refactored for the new `src/data/*` structure.

## Good Entry Points For Next Thread

- Continue event text polish in `src/data/baseEvents.js` and `src/data/chainEvents.js`
- Tune pacing / weighting / repetition control in `src/App.jsx`
- Further split logic from `src/App.jsx` only if needed after the next polish pass
