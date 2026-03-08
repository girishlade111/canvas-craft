/**
 * DevBuilder Engine
 * 
 * Modular architecture with cleanly separated layers:
 * 
 * Layer 1 — Builder UI (src/components/builder/*)
 *   Handles component sidebar, properties panel, canvas, toolbar, device preview.
 *   Only manages user interaction and editing tools.
 * 
 * Layer 2 — Runtime Engine (src/engine/runtime/)
 *   Component tree management, drag-and-drop updates, state synchronization.
 *   Maintains single source of truth for page structure.
 * 
 * Layer 3 — Rendering Engine (src/engine/renderer/)
 *   Converts component tree into React components via recursive rendering.
 * 
 * Layer 4 — Component Registry (src/engine/registry/)
 *   Global registry mapping component types to React components.
 *   Extensible via plugins.
 * 
 * Layer 5 — Code Generation Engine (src/engine/codegen/)
 *   Converts builder schema into deployable code (HTML, React, full projects).
 * 
 * Layer 6 — Deployment Engine (src/engine/deploy/)
 *   Pipeline: schema → code → build → deploy (Vercel API).
 * 
 * Plugin System (src/engine/plugins/)
 *   Plugins can add components, templates, editor extensions.
 */

export * from './runtime';
export * from './renderer';
export * from './registry';
export * from './codegen';
export * from './deploy';
export * from './plugins';
