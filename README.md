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
```jsx
  import { onceTransitionEnd, onceAnimationEnd } from 'web-animation-club';

  const element = document.querySelector('#html-element');

  onceTransitionEnd(element).then((event) => {
    // ... do something
  });
 
  onceAnimationEnd(element).then((event) => {
    // ... do something
  });
```
