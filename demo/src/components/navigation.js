import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navigation.scss';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.container}>
        <nav className={styles.wrapper}>
          {/* <Link to="/about">About</Link> */}
          <Link
            className={styles.logo}
            to="/"
          >
            <img alt="Web Animation Club" src="/assets/web-animation-club.svg" />
          </Link>
          {/* <Link to="/members">Members</Link>
          <Link to="/member/rcaferati">Member</Link> */}
        </nav>
      </div>
    );
  }
}

export default Navigation;
