import React from 'react';
// import PropTypes from 'prop-types';
import { onceTransitionEnd } from '../../../src/index';
import BoxDouble from '../components/box-double';
import styles from './example-a.scss';

const HJS_ITERATIONS = 500000;
const BOX_SIZE = 160;
const BOX_PADDING = 25;

function simulateHeavyJS(element, delay = 350) {
  setTimeout(() => {
    for (let i = 0; i < HJS_ITERATIONS; i += 1) {
      element.getBoundingClientRect().top;
    }
  }, delay);
}

export default class ExampleA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionDuration: '3000ms',
      range: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const rect = this.container.getBoundingClientRect();
    let duration = 2500;

    if (rect.width < 820) {
      duration = 2000;
    }
    if (rect.width < 620) {
      duration = 1600;
    }
    if (rect.width < 420) {
      duration = 1200;
    }

    this.setState({
      transitionDuration: `${duration}ms`,
      range: `${rect.width - BOX_SIZE - (BOX_PADDING * 2)}px`,
    });
  }

  forward = ({ boxA, boxB }) => {
    boxA.classList.add(styles.animated);
    boxB.classList.add(styles.animated);
    boxA.classList.add(styles.boxAFinal);
    boxB.classList.add(styles.boxBFinal);
  }

  reverse = ({ boxA, boxB }) => {
    boxA.classList.remove(styles.boxAFinal);
    boxB.classList.remove(styles.boxBFinal);
  }

  reset = ({ boxA, boxB }) => {
    boxA.classList.remove(styles.animated);
    boxB.classList.remove(styles.animated);
    boxA.classList.remove(styles.boxAFinal);
    boxB.classList.remove(styles.boxBFinal);
  }

  onDurationChange = (event) => {
    console.log('on duration change');
    this.setState({
      transitionDuration: `${event.currentTarget.value}ms`,
    });
  }

  render() {
    return (
      <div
        ref={(container) => { this.container = container; }}
        className={styles.container}
        style={{
          '--duration': `${this.state.transitionDuration}`,
          '--range': `${this.state.range}`,
        }}
      >
        <div className={styles.config}>
          <ul>
            <li>
              <label>Animation Duration</label>
              <div>
                <input
                  onChange={this.onDurationChange}
                  type="range"
                  min="1000"
                  max="10000"
                  value={this.state.transitionDuration.replace(/ms/, '') * 1}
                  step="1000"
                />
                <span>{this.state.transitionDuration}</span>
              </div>
            </li>
          </ul>
        </div>
        <BoxDouble
          title="Clean Animation"
          description="Using Translate3d and Left properties"
          trigger={({ boxA, boxB }) => {
            this.forward({ boxA, boxB });
          }}
          reverse={({ boxA, boxB }) => {
            this.reverse({ boxA, boxB });
          }}
          reset={this.reset}
        />
        <BoxDouble
          title="Heavy Computation"
          description="Using Translate3d and Left properties. Simulating heavy js computation stack. (200ms)"
          trigger={({ boxA, boxB }) => {
            this.forward({ boxA, boxB });
            simulateHeavyJS(boxA);
          }}
          reverse={({ boxA, boxB }) => {
            this.reverse({ boxA, boxB });
            simulateHeavyJS(boxA);
          }}
          reset={this.reset}
        />
        <BoxDouble
          title="Return Animation"
          description="Translate3d and Left. Returning animation with onceTransitionEnd"
          trigger={({ boxA, boxB }) => {
            this.forward({ boxA, boxB });
            onceTransitionEnd(boxA).then(() => {
              this.reverse({ boxA, boxB });
            });
          }}
          reverse={({ boxA, boxB }) => {
            this.reverse({ boxA, boxB });
          }}
          reset={this.reset}
        />
      </div>
    );
  }
}
