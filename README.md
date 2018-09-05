# web-animation-club

#### Dist file
Just load directly in your `HTML` the `web-animation-club.min.js` javascript file located on the `dist` folder.
```html
... 
<script src="/path/to/web-animation-club.min.js"></script>
...
```

### Installation
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

#### Full HTML with ES5
```html
<script src="/path/to/web-animation-club.min.js"></script>
<script>
  var box = document.querySelector('.box');
  
  box.classList.add('animated');
  box.classList.add('move');
  
  onceTransitionEnd(box).then(function() {
    // ... do something
  });
</script>
```
#### ES6
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
