# WAC — CSS transition and animation controls

![NPM](https://img.shields.io/npm/v/@rcaferati/wac.svg)

Tiny JavaScript utility for CSS `transitionend` / `animationend` callbacks and frame/layout timing helpers.

WAC provides small Promise-based helpers to:

- wait for a transition or animation to finish
- ignore bubbled events from child elements
- schedule code on the next layout / future frames
- optionally use refresh-rate independent timing (`fixedFrameThrower`)

---

## Installation

### npm

npm install @rcaferati/wac

### yarn

yarn add @rcaferati/wac

---

## Quick usage

### Wait for a transition to finish

```js
import { onceTransitionEnd } from "@rcaferati/wac";

const box = document.querySelector(".box");

box.classList.add("animated");
box.classList.add("move");

onceTransitionEnd(box).then((event) => {
  // transition finished on `box`
});
```

### Wait for a specific transitioned property

```js
import { onceTransitionEnd } from "@rcaferati/wac";

onceTransitionEnd(box, { propertyName: "transform" }).then(() => {
  // resolves only when the transform transition ends
});
```

### Wait for an animation to finish

```js
import { onceAnimationEnd } from "@rcaferati/wac";

onceAnimationEnd(box).then((event) => {
  // animation finished on `box`
});
```

### Run code after the next CSS layout

```js
import { beforeCssLayout } from "@rcaferati/wac";

beforeCssLayout(() => {
  // runs on next animation frame (or immediately if rAF is unavailable)
});
```

### Wait N real display frames (rAF hops)

```js
import { frameThrower } from "@rcaferati/wac";

await frameThrower(2); // waits using real display frames
```

### Wait N virtual frames (refresh-rate independent)

```js
import { fixedFrameThrower } from "@rcaferati/wac";

// Interprets "10 frames" at 60fps (~166.7ms),
// even on 120Hz / 144Hz displays.
await fixedFrameThrower(10);
```

---

## Basic HTML/CSS example

```html
<style>
  .box {
    width: 40px;
    height: 40px;
    background: #222;
  }

  .animated {
    transition: transform 0.4s linear;
  }

  .move {
    transform: translateX(100px);
  }
</style>

<div class="box"></div>

<script type="module">
  import { onceTransitionEnd } from "@rcaferati/wac";

  const box = document.querySelector(".box");

  box.classList.add("animated");
  box.classList.add("move");

  onceTransitionEnd(box, { propertyName: "transform" }).then(() => {
    console.log("Done");
  });
</script>
```

---

## API

### `onceTransitionEnd(element, options?)`

Waits for the next matching `transitionend` event on `element`.

Returns:

- `Promise<Event | false>`

#### Options

- `tolerance?: number`
  - Number of matching events to skip before resolving.
  - `0` resolves on the first matching event.
- `propertyName?: string`
  - Preferred transition property filter (example: `"transform"`).
- `property?: string`
  - Backward-compatible alias for `propertyName`.

Example:

```js
await onceTransitionEnd(el, { propertyName: "opacity" });
```

---

### `onceAnimationEnd(element, options?)`

Waits for the next matching `animationend` event on `element`.

Returns:

- `Promise<Event | false>`

#### Options

- `tolerance?: number`
  - Number of matching events to skip before resolving.
- `animationName?: string`
  - Optional animation name filter.

Example:

```js
await onceAnimationEnd(el, { animationName: "fade-in" });
```

---

### `setCssEndEvent(element, type, options?)`

Low-level helper used internally by `onceTransitionEnd` / `onceAnimationEnd`.

- `type`: `"transition"` or `"animation"`
- Returns `Promise<Event | false>`

Notes:

- Ignores bubbled child events (only resolves for the exact target element).
- Preserves historical "latest call wins" behavior per element (a new pending listener replaces a previous one created by WAC on the same element).

---

### `beforeCssLayout(callback)`

Runs `callback` on the next animation frame.

Fallback behavior:

- If `requestAnimationFrame` is unavailable, runs immediately.

---

### `beforeFutureCssLayout(frames, callback)`

Runs `callback` a number of frames into the future, plus one extra frame.

Semantics:

- `frames = 0` -> next animation frame
- `frames = 1` -> roughly two frame hops from now

Fallback behavior:

- If `requestAnimationFrame` is unavailable, runs immediately.

---

### `recursiveAnimationFrame(frames, callback)`

Low-level helper that recursively waits for `frames` animation frames and then runs `callback`.

This powers the layout/frame helpers and can be used directly if needed.

---

### `frameThrower(frames)`

Promise wrapper around `beforeFutureCssLayout`.

Uses real display frames (`requestAnimationFrame` hops), so elapsed time depends on monitor refresh rate (60Hz / 120Hz / etc).

Returns:

- `Promise<void>`

---

### `fixedFrameThrower(frames, fps = 60)`

Refresh-rate independent timing helper.

Same intent as `frameThrower()`, but `frames` are interpreted as "virtual frames" at `fps` (60 by default), so timing is stable across 60Hz/120Hz/etc displays.

It still waits at least 1 `requestAnimationFrame` first, preserving CSS/layout timing semantics similar to `beforeFutureCssLayout`.

Examples (`fps = 60`):

- `fixedFrameThrower(0)` -> ~1 rAF (next layout)
- `fixedFrameThrower(10)` -> ~1 rAF + ~166.7ms

Returns:

- `Promise<void>`

---

### `onceNextCssLayout()`

Resolves after two animation frames (double-rAF).

This is useful when you want DOM updates and style calculations to progress enough for reliable transition triggering or measurement.

Returns:

- `Promise<void>`

---

### `framesToMs(frames, fps = 60)`

Converts "virtual frames" to milliseconds.

Examples:

- `framesToMs(1)` -> ~16.67
- `framesToMs(10)` -> ~166.67
- `framesToMs(10, 120)` -> ~83.33

Returns:

- `number`

---

## Notes and caveats

- CSS end events may not fire if:
  - duration/delay is `0`
  - the property/animation does not actually run
  - the animation/transition is canceled or interrupted
  - the element is removed before completion
- If no supported CSS end-event name can be resolved for the element, WAC resolves with `false`.
- In non-browser environments (or when `requestAnimationFrame` is unavailable), frame/layout helpers fall back to immediate execution.

---

## Browser support

WAC targets modern browsers and includes small legacy event-name fallbacks (WebKit / old Opera) for compatibility.

---

## Author

**Rafael Caferati**  
Website: [caferati.dev](https://caferati.dev)  
LinkedIn: [linkedin.com/rcaferati](https://linkedin.com/in/rcaferati)  
Instagram: [instagram.com/rcaferati](https://instagram.com/rcaferati)

---

## License

MIT License

Copyright (c) 2018 @rcaferati