function recursiveAnimationFrame(frames, callback) {
  if (frames && Number.isInteger(frames) && frames > 0) {
    window.requestAnimationFrame(() => {
      recursiveAnimationFrame(frames - 1, callback);
    });
    return;
  }
  callback();
}

function setCssEndEvent(element, type) {
  return new Promise((resolve) => {
    if (!element) {
      resolve(false);
      return;
    }
    const capitalized = type.charAt(0).toUpperCase() + type.slice(1);
    if (element.style[`Webkit${capitalized}`] !== undefined) {
      element.addEventListener(`webkit${capitalized}End`, (event) => {
        if (event.srcElement === element) {
          resolve();
        }
      });
      return;
    } else if (element.style.OTransition !== undefined) {
      element.addEventListener(`o${type}End`, (event) => {
        if (event.srcElement === element) {
          resolve();
        }
      });
      return;
    }
    element.addEventListener(`${type}End`, (event) => {
      if (event.srcElement === element) {
        resolve();
      }
    });
  });
}

export function beforeCssLayout(callback) {
  window.requestAnimationFrame(callback);
}

export function beforeNextCssLayout(callback) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(callback);
  });
}

export function beforeFutureCssLayout(frames, callback) {
  recursiveAnimationFrame(frames + 1, callback);
}

export function waitTransitionEnd(element) {
  return new Promise((resolve) => {
    setCssEndEvent(element, 'transition').then(resolve);
  });
}

export function onceTransitionEnd(element, callback) {
  setCssEndEvent(element, 'transition').then(callback);
}

export function waitAnimationEnd(element) {
  return new Promise((resolve) => {
    setCssEndEvent(element, 'animation').then(resolve);
  });
}
