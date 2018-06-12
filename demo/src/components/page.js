import React, { Component } from 'react';
import styles from './page.scss';

class Page extends Component {
  state = {};

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Page;
