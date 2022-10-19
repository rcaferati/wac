export const recursiveAnimationFrame = (
  frames: number,
  callback: () => void
) => {
  if (window && frames && Number.isInteger(frames) && frames > 0) {
    window.requestAnimationFrame(() => {
      recursiveAnimationFrame(frames - 1, callback);
    });
    return;
  }
  callback();
};

export function setCssEndEvent(
  element: HTMLElement,
  type: "animation" | "transition",
  {
    tolerance = 0,
    propertyName,
  }: { tolerance?: number; propertyName?: string } = {}
) {
  return new Promise((resolve) => {
    if (!element) {
      resolve(false);
      return;
    }
    let eventName: string = null;
    const capitalized = type.charAt(0).toUpperCase() + type.slice(1);
    let run = 0;
    function end(event: any) {
      const target = event.srcElement || event.target;
      if (target === element) {
        if (run >= tolerance) {
          if (propertyName && propertyName !== event.propertyName) {
            return;
          }
          element.removeEventListener(eventName, end);
          resolve(event);
        }
        run += 1;
      }
    }
    // @ts-ignore
    if (element.style[`Webkit${capitalized}`] !== undefined) {
      eventName = `webkit${capitalized}End`;
    }
    // @ts-ignore
    if (element.style?.["OTransition"] !== undefined) {
      eventName = `o${type}End`;
    }
    if (element.style[type] !== undefined) {
      eventName = `${type}end`;
    }
    // @ts-ignore
    if (element.clearCssEndEvent) {
      // @ts-ignore
      element.clearCssEndEvent();
    }
    // @ts-ignore
    element.clearCssEndEvent = function () {
      element.removeEventListener(eventName, end);
    };
    element.addEventListener(eventName, end);
  });
}

export function beforeCssLayout(callback: () => void) {
  if (typeof window === "undefined" || !window?.requestAnimationFrame) {
    callback();
  }
  window.requestAnimationFrame(callback);
}

export function beforeFutureCssLayout(frames: number, callback: () => void) {
  if (typeof window === "undefined" || !window?.requestAnimationFrame) {
    callback();
  }
  recursiveAnimationFrame(frames + 1, callback);
}

export function frameThrower(frames: number) {
  return new Promise((resolve: (value?: unknown) => void) => {
    beforeFutureCssLayout(frames, resolve);
  });
}

export function onceNextCssLayout() {
  return new Promise((resolve: (value?: unknown) => void) => {
    recursiveAnimationFrame(2, resolve);
  });
}

export function onceTransitionEnd(element: HTMLElement, options = {}) {
  return new Promise((resolve: (value?: unknown) => void) => {
    setCssEndEvent(element, "transition", options).then(resolve);
  });
}

export function onceAnimationEnd(element: HTMLElement, options = {}) {
  return new Promise((resolve: (value?: unknown) => void) => {
    setCssEndEvent(element, "animation", options).then(resolve);
  });
}
