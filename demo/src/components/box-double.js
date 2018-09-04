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
    this.state = {
      overlapLabel: 'Overlap',
      moveLabel: 'Trigger',
    };
    this.overlaped = false;
  }

  moveIt = () => {
    if (this.state.moveLabel === 'Trigger') {
      this.triggerIt();
      return;
    }
    this.reverseIt();
  }

  triggerIt() {
    this.setState({
      moveLabel: 'Reverse',
    });
    this.props.trigger({
      boxA: this.boxA,
      boxB: this.boxB,
    });
  }

  reverseIt() {
    this.setState({
      moveLabel: 'Trigger',
    });
    this.props.reverse({
      boxA: this.boxA,
      boxB: this.boxB,
    });
  }

  overlapIt = () => {
    if (!this.overlaped) {
      this.overlap();
      return;
    }
    this.split();
  }

  resetIt = () => {
    this.split();
    this.setState({
      moveLabel: 'Trigger',
    });
    this.props.reset({
      boxA: this.boxA,
      boxB: this.boxB,
    });
  }

  overlap() {
    this.setState({
      overlapLabel: 'Split',
    });
    this.boxes.classList.add(styles.overlap);
    this.overlaped = true;
  }

  split() {
    this.setState({
      overlapLabel: 'Overlap',
    });
    this.boxes.classList.remove(styles.overlap);
    this.overlaped = false;
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
        <div
          ref={(boxes) => { this.boxes = boxes; }}
          className={styles.boxes}
        >
          <div className={styles.track}>
            <div
              ref={(box) => { this.boxA = box; }}
              className={styles.boxA}
            />
          </div>
          <div className={styles.track}>
            <div
              ref={(box) => { this.boxB = box; }}
              className={styles.boxB}
            />
          </div>
        </div>
        <div className={styles.triggers}>
          <AwesomeButton
            type="primary"
            size="small"
            cssModule={AwesomeButtonStyles}
            action={this.moveIt}
          >
            {this.state.moveLabel}
          </AwesomeButton>
          <AwesomeButton
            type="secondary"
            size="small"
            cssModule={AwesomeButtonStyles}
            action={this.overlapIt}
          >
            {this.state.overlapLabel}
          </AwesomeButton>
          <AwesomeButton
            type="disabled"
            size="small"
            cssModule={AwesomeButtonStyles}
            action={this.resetIt}
          >
            Reset
          </AwesomeButton>
        </div>
      </div>
    );
  }
}
