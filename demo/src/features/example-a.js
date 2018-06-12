import React from 'react';
// import PropTypes from 'prop-types';
import { beforeFutureCssLayout, onceTransitionEnd } from '../../../src/index';
import BoxDouble from '../components/box-double';
import styles from './example-a.scss';

console.log(beforeFutureCssLayout);

function simulateHeavyJS(element, delay = 20) {
  setTimeout(() => {
    for (let i = 0; i < 60000; i += 1) {
      element.getBoundingClientRect().top;
    }
  }, delay);
}


export default class ExampleA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.container}>
        <BoxDouble
          title="Clean Animation"
          description="Using Translate3d and Left properties"
          trigger={({ boxA, boxB }) => {
            boxA.classList.add(styles.animated);
            boxB.classList.add(styles.animated);
            boxA.classList.add(styles.boxAFinal);
            boxB.classList.add(styles.boxBFinal);
          }}
          reverse={({ boxA, boxB }) => {
            boxA.classList.remove(styles.boxAFinal);
            boxB.classList.remove(styles.boxBFinal);
          }}
          reset={({ boxA, boxB }) => {
            boxA.classList.remove(styles.animated);
            boxB.classList.remove(styles.animated);
            boxA.classList.remove(styles.boxAFinal);
            boxB.classList.remove(styles.boxBFinal);
          }}
        />
        <BoxDouble
          title="Heavy Computation"
          description="Using Translate3d and Left properties. Simulating heavy js computation stack."
          trigger={({ boxA, boxB }) => {
            boxA.classList.add(styles.animated);
            boxB.classList.add(styles.animated);
            boxA.classList.add(styles.boxAFinal);
            boxB.classList.add(styles.boxBFinal);
            simulateHeavyJS(boxA);
          }}
          reverse={({ boxA, boxB }) => {
            boxA.classList.remove(styles.boxAFinal);
            boxB.classList.remove(styles.boxBFinal);
            simulateHeavyJS(boxA);
          }}
          reset={({ boxA, boxB }) => {
            boxA.classList.remove(styles.animated);
            boxB.classList.remove(styles.animated);
            boxA.classList.remove(styles.boxAFinal);
            boxB.classList.remove(styles.boxBFinal);
          }}
        />
        <BoxDouble
          title="Heavy Computation + Before Future Frame"
          description="Animating Translate3d and Left properties. Simulating heavy js computation stack. Throwing it 5 frames into the future."
          trigger={({ boxA, boxB }) => {
            boxA.classList.add(styles.animated);
            boxB.classList.add(styles.animated);
            console.timeStamp('HERE');
            beforeFutureCssLayout(5, () => {
              console.timeStamp('THERE');
              boxA.classList.add(styles.boxAFinal);
              boxB.classList.add(styles.boxBFinal);
            });
            simulateHeavyJS(boxA);
          }}
          reverse={({ boxA, boxB }) => {
            console.timeStamp('HERE');
            beforeFutureCssLayout(5, () => {
              console.timeStamp('THERE');
              boxA.classList.remove(styles.boxAFinal);
              boxB.classList.remove(styles.boxBFinal);
            });
            simulateHeavyJS(boxA);
          }}
          reset={({ boxA, boxB }) => {
            boxA.classList.remove(styles.animated);
            boxB.classList.remove(styles.animated);
            boxA.classList.remove(styles.boxAFinal);
            boxB.classList.remove(styles.boxBFinal);
          }}
        />
        <BoxDouble
          title="Return Animation"
          description="Translate3d and Left. Returning animation with onceTransitionEnd"
          trigger={({ boxA, boxB }) => {
            boxA.classList.add(styles.animated);
            boxB.classList.add(styles.animated);
            boxA.classList.add(styles.boxAFinal);
            boxB.classList.add(styles.boxBFinal);
            onceTransitionEnd(boxA, () => {
              boxA.classList.remove(styles.boxAFinal);
              boxB.classList.remove(styles.boxBFinal);
            });
          }}
          reverse={({ boxA, boxB }) => {
            boxA.classList.remove(styles.boxAFinal);
            boxB.classList.remove(styles.boxBFinal);
          }}
          reset={({ boxA, boxB }) => {
            boxA.classList.remove(styles.animated);
            boxB.classList.remove(styles.animated);
            boxA.classList.remove(styles.boxAFinal);
            boxB.classList.remove(styles.boxBFinal);
          }}
        />
      </div>
    );
  }
}
