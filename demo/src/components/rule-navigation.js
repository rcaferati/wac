import React from 'react';
import styles from './rule-navigation.scss';

class RulesNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.container}>
        <ul>
          <li>
            <button>1st</button>
          </li>
          <li>
            <button>2nd</button>
          </li>
          <li>
            <button>3rd</button>
          </li>
        </ul>
      </div>
    );
  }
}

export default RulesNavigation;
