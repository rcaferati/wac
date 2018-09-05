# web-animation-club

### Installation
#### NPM
```
npm install --save web-animation-club
```
or
```
yarn add --save web-animation-club
```

#### Dist file
Just load directly on your `HTML` the `web-animation-club.min.js` located on the `dist` folder.
```html
  <script src="/path/to/web-animation-club.min.js"></script>
```

### Basic Usage
```jsx
  import { onceTransitionEnd, onceAnimationEnd } from 'web-animation-club';

  const element = document.querySelector('#html-element');

  onceTransitionEnd(element).then(() => {

  });
 
  onceAnimationEnd(element).then(() => {

  });
```
