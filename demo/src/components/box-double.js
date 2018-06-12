import React from 'react';
import PropTypes from 'prop-types';
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/themes/theme-c137/styles.scss';
import styles from './box-double.scss';

export default class BoxDouble extends React.Component {
  static propTypes = {
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
    trigger: PropTypes.func.isRequired,
    reverse: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  static defaultProps = {
    description: '',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  triggerIt = () => {
    this.props.trigger({
      boxA: this.boxA,
      boxB: this.boxB,
    });
  }

  reverseIt = () => {
    this.props.reverse({
      boxA: this.boxA,
      boxB: this.boxB,
    });
  }

  resetIt = () => {
    this.props.reset({
      boxA: this.boxA,
      boxB: this.boxB,
    });
  }

  render() {
    const {
      title,
      description,
    } = this.props;

    return (
      <div className={styles.container}>
        {title && (
          <header>
            <h2>{title}</h2>
            {description && (<p>{description}</p>)}
          </header>
        )}
        <div className={styles.boxes}>
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
    );
  }
}
