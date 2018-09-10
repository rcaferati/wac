# web-animation-club
Small `~0.6kb` javascript library with cross-browser methods to handle CSS `ontransitionend` and `onanimationend` events. AKA css animation and transition callbacks.

### Live Demo
Access the demo at [https://webanimation.club](https://webanimation.club)

[<img width="600" alt="react-awesome-slider demo" src="https://github.com/rcaferati/web-animation-club/blob/master/demo/assets/wac-demo.gif?raw=true">](https://webanimation.club)

### Installation
#### From the `dist` file
Just load directly in your `HTML` the `web-animation-club.min.js` javascript file located on the `dist` folder.
```html
... 
<script src="https://webanimation.club/library/0.1.2/web-animation-club.min.js"></script>
...
```

#### NPM Registry
From the `NPM registry` using npm or yarn just install the `web-animation-club` package.
```
npm install --save web-animation-club
```
or
```
yarn add --save web-animation-club
```

### Basic Usage
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
<script src="/path/to/web-animation-club.min.js"></script>
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
  import { onceTransitionEnd } from 'web-animation-club';

  const element = document.querySelector('.box');
  
  // here we're just simulating the addition of a class with some animation/transition
  element.classList.add('animated');
  element.classList.add('move');
  
  // if you are using the transition css property
  onceTransitionEnd(element).then((event) => {
    // ... do something
  });
```
