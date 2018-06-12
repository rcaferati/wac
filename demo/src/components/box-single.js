import React from 'react';
import PropTypes from 'prop-types';
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/themes/theme-blue/styles.scss';
import styles from './box-single.scss';

export default class BoxSingle extends React.Component {
  static propTypes = {
    trigger: PropTypes.func.isRequired,
    reverse: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  triggerIt = () => {
    this.props.trigger(this.box);
  }

  reverseIt = () => {
    this.props.reverse(this.box);
  }

  resetIt = () => {
    this.props.reset(this.box);
  }

  render() {
    return (
      <div className={styles.container}>
        <div
          ref={(box) => { this.box = box; }}
          className={styles.box}
        />
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
    );
  }
}
