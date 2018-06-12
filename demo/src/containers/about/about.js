import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Page from '../../components/page';

import styles from './about.scss';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Page>
        <Helmet>
          <title>About Page</title>
          <meta name="description" content="About page description" />
        </Helmet>
        <h1>THIS IS THE ABOUT.</h1>
      </Page>
    );
  }
}

export default connect()(About);
