type CssEndType = "animation" | "transition";
type CssEndOptions = {
    /**
     * Number of matching end-events to skip before resolving.
     * `0` resolves on the first matching event.
     */
    tolerance?: number;
    /**
     * Transition property filter (preferred name).
     */
    propertyName?: string;
    /**
     * Backward-compatible alias for `propertyName` (README used `property`).
     */
    property?: string;
    /**
     * Optional animation-name filter for animation events.
     */
    animationName?: string;
};
type CssEndResult = Event | false;
/**
 * Default FPS used to interpret "virtual frames" for refresh-rate independent timing.
 * 1 virtual frame = 1000 / DEFAULT_VIRTUAL_FPS ms.
 */
declare const DEFAULT_VIRTUAL_FPS = 60;
/**
 * Converts "virtual frames" to milliseconds.
 *
 * By default, virtual frames are interpreted at 60fps:
 * - `1` frame => ~16.67ms
 * - `10` frames => ~166.67ms
 *
 * Invalid inputs are clamped to safe defaults.
 */
declare function framesToMs(frames: number, fps?: number): number;
/**
 * Recursively waits for a given number of animation frames, then runs `callback`.
 *
 * - If `frames <= 0` (or invalid), callback runs immediately.
 * - If `requestAnimationFrame` is unavailable, callback runs immediately.
 *
 * This is the low-level building block for the library's frame/layout helpers.
 */
declare const recursiveAnimationFrame: (frames: number, callback: () => void) => void;
/**
 * Waits for a single CSS end event (`transitionend` or `animationend`) on `element`.
 *
 * Features:
 * - Promise-based API
 * - exact-target filtering (ignores bubbled child events)
 * - optional `tolerance` to skip the first N matching events
 * - optional property filtering for transitions
 * - optional animation-name filtering for animations
 *
 * Historical behavior preserved:
 * - For the same element, the most recent call replaces any prior pending WAC listener.
 *
 * Returns:
 * - `Event` when a matching end-event fires
 * - `false` when `element` is missing or no supported event name is available
 */
declare function setCssEndEvent(element: HTMLElement, type: CssEndType, { tolerance, propertyName, property, animationName }?: CssEndOptions): Promise<CssEndResult>;
/**
 * Schedules `callback` for the next animation frame.
 *
 * This is useful when you need DOM/style changes to settle before running logic
 * tied to layout/paint timing.
 *
 * Falls back to immediate execution when `requestAnimationFrame` is unavailable.
 */
declare function beforeCssLayout(callback: () => void): void;
/**
 * Schedules `callback` a number of frames into the future, plus one extra frame.
 *
 * Semantics:
 * - `frames = 0` => next rAF (same intent as "next CSS layout")
 * - `frames = 1` => roughly two rAFs from now
 *
 * The extra frame preserves the library's historical "future layout" behavior.
 * Falls back to immediate execution when `requestAnimationFrame` is unavailable.
 */
declare function beforeFutureCssLayout(frames: number, callback: () => void): void;
/**
 * Promise wrapper around `beforeFutureCssLayout`.
 *
 * Uses *real display frames* (rAF hops), so elapsed time depends on the
 * device refresh rate (e.g. 60Hz vs 120Hz).
 */
declare function frameThrower(frames: number): Promise<void>;
/**
 * Refresh-rate independent timing helper.
 *
 * Same intent as `frameThrower()`, but `frames` are interpreted as "virtual frames"
 * at `fps` (60 by default), so timing is stable across 60Hz/120Hz/etc displays.
 *
 * It still waits at least 1 rAF first, preserving CSS/layout timing semantics similar
 * to `beforeFutureCssLayout`.
 *
 * Examples (fps=60):
 * - fixedFrameThrower(0)  => ~1 rAF (next layout)
 * - fixedFrameThrower(10) => ~1 rAF + ~166.7ms
 */
declare function fixedFrameThrower(frames: number, fps?: number): Promise<void>;
/**
 * Resolves after two animation frames (double-rAF).
 *
 * This is a common pattern to ensure DOM updates and style calculations have
 * progressed enough for reliable transition triggering/measurement.
 */
declare function onceNextCssLayout(): Promise<void>;
/**
 * Convenience helper that waits for the next matching `transitionend` event on `element`.
 *
 * See `setCssEndEvent()` for filtering and tolerance options.
 */
declare function onceTransitionEnd(element: HTMLElement, options?: CssEndOptions): Promise<CssEndResult>;
/**
 * Convenience helper that waits for the next matching `animationend` event on `element`.
 *
 * See `setCssEndEvent()` for filtering and tolerance options.
 */
declare function onceAnimationEnd(element: HTMLElement, options?: CssEndOptions): Promise<CssEndResult>;

export { type CssEndOptions, DEFAULT_VIRTUAL_FPS, beforeCssLayout, beforeFutureCssLayout, fixedFrameThrower, frameThrower, framesToMs, onceAnimationEnd, onceNextCssLayout, onceTransitionEnd, recursiveAnimationFrame, setCssEndEvent };
