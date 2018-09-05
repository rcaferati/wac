# web-animation-club

### Installation
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

  onceTransitionEnd(element).then(() => {

  });
 
  onceAnimationEnd(element).then(() => {

  });
```
