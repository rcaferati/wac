type CssEndType = "animation" | "transition";

export type CssEndOptions = {
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
export const DEFAULT_VIRTUAL_FPS = 60;

/**
 * Tracks the active CSS end-event cleanup callback for each element.
 *
 * This preserves the historical "latest call wins" behavior without mutating DOM nodes.
 */
const activeCssEndCleanup = new WeakMap<HTMLElement, () => void>();

/**
 * Returns a safe `requestAnimationFrame` function bound to `window`, or `null`
 * when running outside a browser / without rAF support.
 */
function getRaf(): ((cb: FrameRequestCallback) => number) | null {
  if (typeof window === "undefined") return null;
  if (typeof window.requestAnimationFrame !== "function") return null;
  return window.requestAnimationFrame.bind(window);
}

/**
 * Normalizes a frame count into a non-negative integer.
 *
 * Invalid, negative, or non-finite values become `0`.
 */
function normalizeFrames(frames: number): number {
  return Number.isFinite(frames) && frames > 0 ? Math.floor(frames) : 0;
}

/**
 * Normalizes an FPS value to a valid positive number, falling back to
 * `DEFAULT_VIRTUAL_FPS` when invalid.
 */
function normalizeFps(fps: number): number {
  return Number.isFinite(fps) && fps > 0 ? fps : DEFAULT_VIRTUAL_FPS;
}

/**
 * Resolves the correct CSS end-event name for an element and type.
 *
 * Prefers standard event names (`transitionend` / `animationend`) and keeps
 * small legacy fallbacks for older WebKit / Opera engines.
 *
 * Returns `null` when no supported event can be inferred.
 */
function resolveCssEndEventName(
  element: HTMLElement,
  type: CssEndType,
): string | null {
  const style = element.style as CSSStyleDeclaration & Record<string, unknown>;
  const capitalized = type.charAt(0).toUpperCase() + type.slice(1);

  // Standard modern event names first.
  if (style[type] !== undefined) {
    return `${type}end`;
  }

  // WebKit legacy fallback.
  if (style[`Webkit${capitalized}`] !== undefined) {
    return `webkit${capitalized}End`;
  }

  // Old Opera fallback (kept for backward compatibility).
  if (type === "transition" && style.OTransition !== undefined) {
    return "oTransitionEnd";
  }
  if (type === "animation" && style.OAnimation !== undefined) {
    return "oAnimationEnd";
  }

  return null;
}

/**
 * Converts "virtual frames" to milliseconds.
 *
 * By default, virtual frames are interpreted at 60fps:
 * - `1` frame => ~16.67ms
 * - `10` frames => ~166.67ms
 *
 * Invalid inputs are clamped to safe defaults.
 */
export function framesToMs(
  frames: number,
  fps: number = DEFAULT_VIRTUAL_FPS,
): number {
  const f = normalizeFrames(frames);
  const rate = normalizeFps(fps);
  return f * (1000 / rate);
}

/**
 * Recursively waits for a given number of animation frames, then runs `callback`.
 *
 * - If `frames <= 0` (or invalid), callback runs immediately.
 * - If `requestAnimationFrame` is unavailable, callback runs immediately.
 *
 * This is the low-level building block for the library's frame/layout helpers.
 */
export const recursiveAnimationFrame = (
  frames: number,
  callback: () => void,
) => {
  const raf = getRaf();
  const remaining = normalizeFrames(frames);

  if (!raf || remaining === 0) {
    callback();
    return;
  }

  raf(() => {
    recursiveAnimationFrame(remaining - 1, callback);
  });
};

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
export function setCssEndEvent(
  element: HTMLElement,
  type: CssEndType,
  { tolerance = 0, propertyName, property, animationName }: CssEndOptions = {},
): Promise<CssEndResult> {
  return new Promise((resolve) => {
    if (!element) {
      resolve(false);
      return;
    }

    const eventName = resolveCssEndEventName(element, type);
    if (!eventName) {
      resolve(false);
      return;
    }

    // Preserve original "latest call wins" behavior for the same element,
    // but without mutating DOM nodes.
    const previousCleanup = activeCssEndCleanup.get(element);
    if (previousCleanup) {
      previousCleanup();
      activeCssEndCleanup.delete(element);
    }

    const requiredMatches = Math.max(0, Math.trunc(tolerance));
    const transitionPropertyFilter = propertyName ?? property;
    let matchCount = 0;

    const cleanup = () => {
      element.removeEventListener(eventName, onEnd as EventListener);
      const current = activeCssEndCleanup.get(element);
      if (current === cleanup) {
        activeCssEndCleanup.delete(element);
      }
    };

    const onEnd = (event: Event) => {
      const target = (event as any).target ?? (event as any).srcElement;
      if (target !== element) return;

      if (type === "transition" && transitionPropertyFilter) {
        const e = event as TransitionEvent;
        if (e.propertyName !== transitionPropertyFilter) return;
      }

      if (type === "animation" && animationName) {
        const e = event as AnimationEvent;
        if (e.animationName !== animationName) return;
      }

      if (matchCount >= requiredMatches) {
        cleanup();
        resolve(event);
        return;
      }

      matchCount += 1;
    };

    activeCssEndCleanup.set(element, cleanup);
    element.addEventListener(eventName, onEnd as EventListener);
  });
}

/**
 * Schedules `callback` for the next animation frame.
 *
 * This is useful when you need DOM/style changes to settle before running logic
 * tied to layout/paint timing.
 *
 * Falls back to immediate execution when `requestAnimationFrame` is unavailable.
 */
export function beforeCssLayout(callback: () => void) {
  const raf = getRaf();
  if (!raf) {
    callback();
    return;
  }
  raf(() => callback());
}

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
export function beforeFutureCssLayout(frames: number, callback: () => void) {
  const raf = getRaf();
  if (!raf) {
    callback();
    return;
  }
  recursiveAnimationFrame(normalizeFrames(frames) + 1, callback);
}

/**
 * Promise wrapper around `beforeFutureCssLayout`.
 *
 * Uses *real display frames* (rAF hops), so elapsed time depends on the
 * device refresh rate (e.g. 60Hz vs 120Hz).
 */
export function frameThrower(frames: number) {
  return new Promise<void>((resolve) => {
    beforeFutureCssLayout(frames, resolve);
  });
}

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
export function fixedFrameThrower(
  frames: number,
  fps: number = DEFAULT_VIRTUAL_FPS,
) {
  return new Promise<void>((resolve) => {
    const raf = getRaf();
    if (!raf) {
      resolve();
      return;
    }

    const durationMs = framesToMs(frames, fps);

    // Always wait at least one rAF (keeps CSS/layout timing sane).
    raf((t0) => {
      if (durationMs <= 0) {
        resolve();
        return;
      }

      const start = t0;

      const tick: FrameRequestCallback = (t) => {
        if (t - start >= durationMs) {
          resolve();
          return;
        }
        raf(tick);
      };

      raf(tick);
    });
  });
}

/**
 * Resolves after two animation frames (double-rAF).
 *
 * This is a common pattern to ensure DOM updates and style calculations have
 * progressed enough for reliable transition triggering/measurement.
 */
export function onceNextCssLayout() {
  return new Promise<void>((resolve) => {
    recursiveAnimationFrame(2, resolve);
  });
}

/**
 * Convenience helper that waits for the next matching `transitionend` event on `element`.
 *
 * See `setCssEndEvent()` for filtering and tolerance options.
 */
export function onceTransitionEnd(
  element: HTMLElement,
  options: CssEndOptions = {},
) {
  return setCssEndEvent(element, "transition", options);
}

/**
 * Convenience helper that waits for the next matching `animationend` event on `element`.
 *
 * See `setCssEndEvent()` for filtering and tolerance options.
 */
export function onceAnimationEnd(
  element: HTMLElement,
  options: CssEndOptions = {},
) {
  return setCssEndEvent(element, "animation", options);
}
