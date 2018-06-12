import React, { Component } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/themes/theme-blue/styles.scss';
import styles from './rule.scss';

console.log(AwesomeButtonStyles);

class Rule extends Component {
  state = {};

  triggerIt = () => {
    this.boxes.classList.add(styles.animated);
    this.boxA.classList.add(styles.moveRight);
    this.boxB.classList.add(styles.moveWrong);
  }

  reverseIt = () => {
    this.boxA.classList.remove(styles.moveRight);
    this.boxB.classList.remove(styles.moveWrong);
  }

  resetIt = () => {
    this.boxes.classList.remove(styles.animated);
    this.boxA.classList.remove(styles.moveRight);
    this.boxB.classList.remove(styles.moveWrong);
  }

  render() {
    return (
      <section className={styles.container}>
        <header>
          <h3>The <strong>4th rule</strong> of the Web Animation Club is</h3>
          <h2>You shall not do this while doing that. Cause it's bad. And wrong. And you're stupid.</h2>
          <p>This is the body explaining the thing</p>
        </header>
        <div className={styles.body}>
          <div className={styles.example}>
            <div
              ref={(boxes) => { this.boxes = boxes; }}
              className={styles.boxes}
            >
              <div
                ref={(box) => { this.boxA = box; }}
                className={styles.boxA}
              />
              <div
                ref={(box) => { this.boxB = box; }}
                className={styles.boxB}
              />
            </div>
            <div className={styles.triggers}>
              <AwesomeButton
                type="primary"
                cssModule={AwesomeButtonStyles}
                action={this.triggerIt}
              >
                Trigger it
              </AwesomeButton>
              <AwesomeButton
                cssModule={AwesomeButtonStyles}
                action={this.reverseIt}
              >
                Reverse it
              </AwesomeButton>
              <AwesomeButton
                type="secondary"
                cssModule={AwesomeButtonStyles}
                action={this.resetIt}
              >
                Reset it
              </AwesomeButton>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Rule;
