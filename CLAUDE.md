# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

svelte-dnd-action is a feature-complete drag and drop implementation for Svelte using a custom action. It's a production-ready library with no runtime dependencies that provides drag and drop functionality through Svelte actions rather than components.

## Key Commands

```bash
# Development
pnpm build      # Lint and build the library (creates dist/)
pnpm lint       # Run ESLint
pnpm format     # Format code with Prettier
pnpm test       # Run Cypress tests

# Build outputs
# - dist/index.mjs (ES module)
# - dist/index.js (UMD)
# - dist/index.d.ts (TypeScript definitions)
```

## Architecture Overview

The library uses a modular architecture with three main interaction handlers:

1. **Core Action** (`src/action.js`)
   - Main `dndzone` action that transforms containers into drop zones
   - Delegates to pointer or keyboard actions based on interaction type
   - Manages configuration and state coordination

2. **Pointer Interactions** (`src/pointerAction.js`)
   - Handles mouse and touch drag operations
   - Creates shadow elements during drag
   - Manages drop zone detection and item movement
   - Key concepts: draggedElData, shadowElData, originDropZone

3. **Keyboard Interactions** (`src/keyboardAction.js`)
   - Provides accessible keyboard-based drag operations
   - Manages focus and aria attributes
   - Implements spatial navigation for item movement

## Critical Implementation Details

### Shadow Element System
- During drag, a "shadow" element represents the item's potential position
- Shadow items are marked with `isDndShadowItem` property
- The original element remains in DOM but hidden during drag
- Shadow elements must maintain original item properties for proper sorting

### Event System
- `consider` events fire during drag for preview updates
- `finalize` events fire on drop to commit changes
- Events include trigger type, item ID, and source (pointer/keyboard)

### Item Identification
- Items must have unique IDs (configurable via `overrideItemIdKeyNameBeforeInitialisingDndZones`)
- Default key is "id" but can be customized globally
- Shadow items require special handling to avoid duplicate ID conflicts

### Type System
- Drop zones can have types to restrict what can be dropped
- `--any--` is the default type allowing all items
- Type matching controls cross-zone transfers

## Current Development Context

The library is being forked and migrated from yarn to pnpm. Recent work includes:
- Converting build system to pnpm
- Including dist/ in repository for GitHub package references
- Fixing shadow item sorting issues where shadow elements appeared in wrong positions

## Testing Approach

Cypress integration tests cover:
- Event dispatching (`dispatcher.spec.js`)
- Geometry calculations (`intersection.spec.js`)
- List manipulation (`listUtil.spec.js`)
- Utility functions (`util.spec.js`)

## Important Files

- `src/constants.js` - Shared constants and configuration
- `src/helpers/dispatcher.js` - Event creation and dispatching
- `src/helpers/styler.js` - DOM manipulation and styling
- `src/helpers/observer.js` - Intersection observation for auto-scrolling
- `typings/index.d.ts` - TypeScript definitions (copied to dist/ on build)