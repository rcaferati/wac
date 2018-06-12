import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import styles from './members.scss';
import Page from '../../components/page';

class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Page>
        <Helmet>
          <title>List Page</title>
          <meta name="description" content="List page description" />
        </Helmet>
        <h1>THIS IS THE MEMBERS.</h1>
      </Page>
    );
  }
}

export default connect()(Members);
