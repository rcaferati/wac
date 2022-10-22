# WAC — CSS transition and animation controls

[![Travis](https://img.shields.io/travis/rcaferati/web-animation-club/master.svg)](https://travis-ci.org/rcaferati/web-animation-club) ![NPM](https://img.shields.io/npm/v/web-animation-club.svg)

Tiny `~0.8kb` javascript library with cross-browser methods to handle CSS `ontransitionend` and `onanimationend` event — AKA CSS animation and transition callbacks.

## Quick usage
Quick usage example of the `onceTransitionEnd` wac method.
```javascript
wac.onceTransitionEnd(element).then(function(event) {
  // ... do something
});
```

## Live Demo
Access the demo at [https://web-animation.caferati.me](https://web-animation.caferati.me)

[<img width="600" alt="react-awesome-slider demo" src="https://github.com/rcaferati/web-animation-club/blob/master/demo/assets/wac-video.gif?raw=true">](https://web-animation.caferati.me)

## Installation

#### NPM Registry
From the `NPM registry` using npm or yarn just install `@rcaferati/wac` package.
```
npm install --save @rcaferati/wac
```
or
```
yarn add --save @rcaferati/wac
```

## Basic Usage
For all the following examples please consider the following HTML markup.
```html
<style>
  .animated {
    transition: transform 0.4s linear;
  }
  .move {
    transform: translateX(100px);
  }
</style>
<div class="container">
  <div class="box"></div>
</div>
```

#### HTML with ES5
```html
<script src="/path/to/wac.min.js"></script>
<script>
  var box = document.querySelector('.box');
  
  box.classList.add('animated');
  box.classList.add('move');
  
  onceTransitionEnd(box).then(function(event) {
    // ... do something
  });
</script>
```
#### Javascript ES6
```jsx
  import { onceTransitionEnd } from '@rcaferati/wac';

  const element = document.querySelector('.box');
  
  // here we're just simulating the addition of a class with some animation/transition
  element.classList.add('animated');
  element.classList.add('move');
  
  // if you are using the transition css property
  onceTransitionEnd(element).then((event) => {
    // ... do something
  });
```

## WAC methods

#### onceTransitionEnd(element, options)
- `element` <[HTML element]> html element on which the transition is happening
- `options` <[object]>
  - `tolerance` <[integer]> used in case of pseudo-element animations
  - `property` <[string]> animated property to check before calling the callback

#### onceAnimationEnd(element, options)
- `element` <[HTML element]> html element on which the transition is happening
- `options` <[object]>
  - `tolerance` <[integer]> used in case of pseudo-element animations
  - `property` <[string]> animated property to check before calling the callback
  
#### beforeFutureCssLayout(frames, callback)
- `frames` <[integer]> Number of frames to skip
- `callback` <[function]> function called after the skipped frames

#### beforeNextCssLayout(callback)
- `callback` <[function]> function called after the skipped frame

## Author
#### Rafael Caferati
+ Checkout my <a href="https://caferati.me" title="Full-Stack Web Developer, UI/UX Javascript Specialist" target="_blank">Portfolio Website</a>
+ Follow on <a href="https://github.com/rcaferati" title="rcaferati github profile" target="_blank">GitHub</a>
+ Connect on <a href="https://linkedin.com/in/rcaferati" title="rcaferati linkedin profile" target="_blank">LinkedIn</a>

## License

MIT. Copyright (c) 2018 Rafael Caferati.
